// == TS style imported packages
import {GraphDatabase} from 'neo4j';
import {app} from '../app';
import environment from "../environment";
import {RepositoryInterface} from "./repository.interface";
import {RepositoryMongodb} from "./repository.mongodb";
import {RepositoryNeo4j} from "./repository.neo4j";

// == Exported constants
// Repositories, threads are handled through MongoDb, friends are handled through Neo4j (diff. imp. allowed)
export const threadRepository: RepositoryInterface = new RepositoryMongodb();
export const friendRepository: RepositoryInterface = new RepositoryNeo4j();
// First check the process environment (Heroku), then the configuration, only then use hardcoded
export const port = process.env.PORT || environment.app.port || 5000;
// For repositories
export let neo4jDb: any;
export let mongoDb: any;

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
        useNewUrlParser: true
    });
    this.mongoDb = mongoose.connection;

    // Error handle, end the process if we can't connect
    mongoDb.on('error', (error: any) => {
        console.log(error);
        process.exit(130);
    });

    // Connection handle, proceed to next step once we're connected
    mongoDb.once('open', () => {
        console.log('Connected to MongoDb database');
        app.emit('mongoConnected');
    });
}

// Called once MongoDb is connected
app.on('mongoConnected', async () => {
    try {
        // Connect to Neo4J
        neo4jDb = new GraphDatabase(environment.database.neo4j);
    } catch (err) {
        // If an error occurs end the process
        console.log('An error occurred while connecting to Neo4j :\n' + err);
        process.exit(130);
    }
    // If the object is connected, emit the neo4j connected event
    if (neo4jDb) app.emit('neo4jConnected');
});

// Once all databases responded, start listening for client requests
app.on('neo4jConnected', () => app.listen(port, () => console.log('Application started on port ' + port)));
