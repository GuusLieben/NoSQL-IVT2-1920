// == NodeJS style imported packages
export const mongoose = require('mongoose');
export const neo = require('neo4j-driver').v1;

// == TS style imported packages
import {app, logger, prod} from '../app';
import environment from '../environment';
import {Connection} from 'mongoose';
import {queries} from './queries.neo4j';

// == Exported constants
// First check the process environment (Heroku), then the configuration, only then use hardcoded
export const port = process.env.PORT || environment.app.port || 5000;
// For repositories
export let mongoDb: Connection;

// == NodeJS style imported packages
export const neo4JDriver = neo.driver(environment.database.neo4j.uri,
    neo.auth.basic(
        environment.database.neo4j.user,
        environment.database.neo4j.password
    ));

export async function init(): Promise<void> {
    logger.color('yellow').log('⚠️ Initiating application service');

    // Either emits 'error' which logs the error and closes the server
    // Or emits 'open' which emits 'mongoConnected' to Express
    if (prod) {
        await mongoose.connect(environment.database.mongo.uri, {
            auth: {
                user: environment.database.mongo.user,
                password: environment.database.mongo.password
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } else {
        await mongoose.connect(environment.test.mongo.uri, {
            auth: {
                user: environment.test.mongo.user,
                password: environment.test.mongo.password
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    this.mongoDb = mongoose.connection;

    // Error handle, end the process if we can't connect
    mongoDb.on('error', (error: any) => {
        logger.error(error);
        process.exit(130);
    });

    // Connection handle, proceed to next step if we're connected
    if (this.mongoDb.readyState > 0) {
        logger.color('blue').log('> Connected to MongoDb database\n');
        app.emit('mongoConnected');
    }
}

// Called once MongoDb is connected
app.on('mongoConnected', async () => {

    // Tries to connect to the Neo4J DB to check if the connection is valid
    // Creates and deletes the person Bob as a test, throws errors if this fails
    const createSession = neo4JDriver.session();
    await createSession
        .run(queries.createTestObject)
        .then(async (result: { records: any[]; }) => {

            for (const record of result.records) {
                const deleteSession = neo4JDriver.session();
                await deleteSession
                    .run(queries.deleteTestObject)
                    .catch(function (error: any) {
                        logger.error(error);
                        process.exit(130);
                    });
                logger.color('magenta').log('> Verified connection and RWX permissions for Neo4J');
                deleteSession.close();
            }

            createSession.close();

            logger.color('blue').log('> Connected to Neo4J database\n');
            app.emit('neo4jConnected');
        })
        .catch(function (error: any) {
            logger.error(error);
            process.exit(130);
        });
});

// Once all databases responded, start listening for client requests
app.on('neo4jConnected', () => app.listen(port, () => {
    logger.info('Production : ' + prod);
    logger.color('yellow').log('⚠️ Application started on port ' + port);
}));
