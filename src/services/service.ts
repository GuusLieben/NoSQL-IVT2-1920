// == TS style imported packages
import {app} from '../app';
import environment from '../environment';
import {RepositoryInterface} from './repository.interface';
import {RepositoryMongodb} from './repository.mongodb';
import {RepositoryNeo4j} from './repository.neo4j';
import {Connection} from 'mongoose';
import * as neo4j from 'neo4j-driver';
// == Exported constants
// Repositories, threads are handled through MongoDb, friends are handled through Neo4j (diff. imp. allowed)
export const threadRepository: RepositoryInterface = new RepositoryMongodb();
export const friendRepository: RepositoryInterface = new RepositoryNeo4j();
// First check the process environment (Heroku), then the configuration, only then use hardcoded
export const port = process.env.PORT || environment.app.port || 5000;
// For repositories
export let neo4jDb: neo4j.v1.Session;
export let mongoDb: Connection;

// == NodeJS style imported packages
const mongoose = require('mongoose');

export async function init() {
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
        console.log(error);
        process.exit(130);
    });

    // Connection handle, proceed to next step if we're connected
    if (this.mongoDb.readyState > 0) {
        console.log('> Connected to MongoDb database');
        console.log('-> Exact state ::' + this.mongoDb.readyState + '\n');
        app.emit('mongoConnected');
    }
}

// Called once MongoDb is connected
app.on('mongoConnected', async () => {

    // TODO : Fix connection check below

    try {
        neo4jDb = await neo4j.v1.driver(
            environment.database.neo4j.uri,
            neo4j.v1.auth.basic(environment.database.neo4j.user, environment.database.neo4j.password)
        ).session();
    } catch (err) {
        console.log(err);
        process.exit(130);
    }

    // If the object is connected, emit the neo4j connected event
    if (neo4jDb) {
        console.log('> Connected to Neo4J databse');
        app.emit('neo4jConnected');
    }

    // TODO : Above

});

// Once all databases responded, start listening for client requests
app.on('neo4jConnected', () => app.listen(port, () => console.log('> Application started on port ' + port)));
