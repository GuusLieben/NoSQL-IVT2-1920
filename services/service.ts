import {mongo} from 'mongoose';
import {GraphDatabase} from 'neo4j';

import {app} from '../app';
import environment from "../environment";
import {RepositoryInterface} from "./repository.interface";
import {RepositoryMongodb} from "./repository.mongodb";
import {RepositoryNeo4j} from "./repository.neo4j";

export const mongoRepository: RepositoryInterface = new RepositoryMongodb();
export const neo4jRepository: RepositoryInterface = new RepositoryNeo4j();

export const port = process.env.PORT || environment.app.port || 5000;
export let mongoDb: any;
export let neo4jDb: any;

export function init() {
    mongoDb = mongo.connect(environment.mongo.connectionString, (err: any, response: any) => {
        if (err) {
            console.log('An error occurred while connecting to MongoDb :\n' + err);
        } else {
            app.emit('mongoConnected')
            console.log('Connected to MongoDb on : ' + response.s.url);
        }
    });
}

app.on('mongoConnected', () => {
    try {
        neo4jDb = new GraphDatabase('http://username:password@localhost:7474');
    } catch (err) {
        console.log('An error occurred while connecting to Neo4j :\n' + err);
    }
    if (neo4jDb) app.emit('neo4jConnected');
});

app.on('neo4jConnected', () => app.listen(port, () => console.log('Application started on port ' + port)));
