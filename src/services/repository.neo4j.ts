import {Result} from '../models/result';
import {RepositoryInterface} from './repository.interface';
import {neo4JDriver} from './service';
import {queries} from './queries.neo4j';
import {logger} from "../app";

export class RepositoryNeo4j implements RepositoryInterface {

    constructor() {
    }

    async createFriends(username1: string, username2: string): Promise<Result> {
        const session = neo4JDriver.session();

        await session.run(queries.createFriends(username1, username2))
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result(error, false);
            });
        session.close();
        return new Result(undefined, true);
    }

    async getFriends(username: string): Promise<Result> {
        const session = neo4JDriver.session();

        return await session.run(queries.getFriends(username))
            .then((result: any) => {
                session.close();
                const users: string[] = [];
                result.records.forEach((record: any) => users.push(record.get('user.name')))
                return new Result(undefined, users);
            })
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result(error, false);
            });
    }

    async deleteFriends(username1: string, username2: string): Promise<Result> {
        const session = neo4JDriver.session();

        await session.run(queries.deleteFriendsRelationship(username1, username2))
            .then(async (result: any) => {

                const deleteNodeSession = neo4JDriver.session();

                await deleteNodeSession.run(queries.deleteFriendlessNodes(username1, username2))
                    .catch(function (error: any) {
                        logger.error(error);
                        return new Result(error, false);
                    });
                deleteNodeSession.close();

            })
            .catch(function (error: any) {
                logger.error(error);
                session.close();
                return new Result(error, false);
            });
        session.close();
        return new Result(undefined, true);
    }

    createThread(username: String, title: String, content: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    createUser(username: String, password: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    deleteComment(commentId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    deleteThread(threadId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    deleteUser(username: String, password: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    getComment(commentId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    getCommentsForThread(threadId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    getThread(threadId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    getThreads(): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    getUser(username: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    postComment(threadId: Object): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    updateThread(threadId: Object, content: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    downvote(threadId: Object, username: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }

    upvote(threadId: Object, username: String): Promise<Result> {
        throw 'Method not implemented in Neo4J';
    }
}
