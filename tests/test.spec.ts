import * as serviceSpec from '../src/services/service.spec';
import {RepositorySpec} from "../src/services/repository.spec";
import {RepositoryMongodb} from "../src/services/repository.mongodb";
import {RepositoryNeo4j} from "../src/services/repository.neo4j";

const ServiceSpec = serviceSpec;
const MongoSpec = new RepositorySpec<RepositoryMongodb>();
const neo4jSpec = new RepositorySpec<RepositoryNeo4j>();
