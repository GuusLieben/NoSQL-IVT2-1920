import {User} from '../models/user';
import {Result} from '../models/result';
import {RepositoryInterface} from './repository.interface';
import {neo4JDriver} from './service';
import {queries} from './queries.neo4j';
import {logger} from "../app";
import {Thread} from "../models/thread";
import {Comment} from "../models/comment";

export class RepositoryNeo4j implements RepositoryInterface {

    async createFriends(user1: User, user2: User): Promise<Result<Boolean>> {
        const session = neo4JDriver.session();

        await session.run(queries.createFriends(user1, user2))
            .then((result: { records: any[]; }) => {
                result.records.forEach(async record => {
                    logger.color('blue').log(record);
                })
            })
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result<Boolean>(error, false);
            });
        session.close();
        return new Result<Boolean>(undefined, true);
    }

    async getFriends(username: String): Promise<Result<string[]>> {
        const session = neo4JDriver.session();

        await session.run(queries.getFriends(username))
            .then((result: any) => {
                session.close();
                return new Result<string[]>(undefined, result.records);
            })
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result<Boolean>(error, false);
            });

        session.close();
        return new Result<string[]>(undefined, []);
    }

    async deleteFriends(user1: User, user2: User): Promise<Result<any>> {
        const session = neo4JDriver.session();

        await session.run(queries.deleteFriendsRelationship(user1, user2))
            .then(async (result: any) => {

                const deleteNodeSession = neo4JDriver.session();
                // TODO : Delete only user1/2 if no friends left
                // Do not loop all users (growth impact)
                await deleteNodeSession.run(queries.deleteFriendsNodes)
                    .catch(function (error: any) {
                        logger.error(error);
                        return new Result<Boolean>(error, false);
                    });
                deleteNodeSession.close();

            })
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result<Boolean>(error, false);
            });
        session.close();
        return new Result<Boolean>(undefined, true);
    }

    createThread(user: User, title: String, content: String): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    createUser(username: String, password: String): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    deleteComment(commentId: Object): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    deleteThread(threadId: Object): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    deleteUser(username: String, password: String): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    getComment(commentId: Object): Promise<Result<Comment>> {
        throw 'Method not implemented in Neo4J';
    }

    getCommentsForThread(threadId: Object): Promise<Result<Array<Comment>>> {
        throw 'Method not implemented in Neo4J';
    }

    getThread(threadId: Object): Promise<Result<Thread>> {
        throw 'Method not implemented in Neo4J';
    }

    getThreads(): Promise<Result<Array<Thread>>> {
        throw 'Method not implemented in Neo4J';
    }

    getUser(username: String): Promise<Result<User>> {
        throw 'Method not implemented in Neo4J';
    }

    postComment(threadId: Object): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    updateThread(threadId: Object, content: String): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result<Boolean>> {
        throw 'Method not implemented in Neo4J';
    }
}
