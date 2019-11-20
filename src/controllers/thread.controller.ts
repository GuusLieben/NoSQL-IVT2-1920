import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryMongodb} from "../services/repository.mongodb";
import {logger} from "../app";

const friendRepository: RepositoryInterface = new RepositoryMongodb();
