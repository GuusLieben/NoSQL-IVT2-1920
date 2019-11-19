// == TS style imported packages
import {app, logger} from '../app';
import environment from '../environment';
import {RepositoryInterface} from './repository.interface';
import {RepositoryMongodb} from './repository.mongodb';
import {RepositoryNeo4j} from './repository.neo4j';
import {Connection} from 'mongoose';
import {queries} from './queries.neo4j';

// == Exported constants
// Repositories, threads are handled through MongoDb, friends are handled through Neo4j (diff. imp. allowed)
export const threadRepository: RepositoryInterface = new RepositoryMongodb();
export const friendRepository: RepositoryInterface = new RepositoryNeo4j();
// First check the process environment (Heroku), then the configuration, only then use hardcoded
export const port = process.env.PORT || environment.app.port || 5000;
// For repositories
export let mongoDb: Connection;

// == NodeJS style imported packages
const mongoose = require('mongoose');
export const neo = require('neo4j-driver').v1;
export const neo4JDriver = neo.driver(environment.database.neo4j.uri,
    neo.auth.basic(environment.database.neo4j.user, environment.database.neo4j.password));

export async function init() {
    logger.color('yellow').log('⚠️ Initiating application service');

    // Either emits 'error' which logs the error and closes the server
    // Or emits 'open' which emits 'mongoConnected' to Express
    await mongoose.connect(environment.database.mongo.uri, {
        auth: {
            user: environment.database.mongo.user,
            password: environment.database.mongo.password
        },
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    this.mongoDb = mongoose.connection;

    // Error handle, end the process if we can't connect
    mongoDb.on('error', (error: any) => {
        logger.error(error);
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
    logger.color('yellow').log('⚠️ Application started on port ' + port);
}));
