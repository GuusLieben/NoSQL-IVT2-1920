import {Types} from 'mongoose';
import ObjectId = Types.ObjectId;
import {Comment} from '../models/comment';
import {User} from '../models/user';
import {Thread} from '../models/thread';
import {Result} from '../models/result';
import {Friends} from '../models/friends';
import {RepositoryInterface} from './repository.interface';
import {neo} from './service';
import {neo4JDriver} from './service';
import {queries} from './queries.neo4j';
import {logger} from "../app";

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
                process.exit(130);
                session.close();
                return new Result<Boolean>(error, false);
            });
        session.close();
        return new Result<Boolean>(undefined, true);
    }

    async getFriends(username: String): Promise<Result<string[]>>{
        const session = neo4JDriver.session();
        let results: Array<string>;
        results = [];

        await session.run(queries.getFriends(username))
            .then((result: { records: any[]; }) => {
                result.records.forEach(async record => {
                    results.push(record);
                })
            })
            .catch(function (error: any) {
                logger.error(error);
                process.exit(130);
                session.close();
                return new Result<Boolean>(error, false);
            });
        session.close();
        return new Result<string[]>(undefined, results);
    }

    async deleteFriends(user1: User, user2: User): Promise<Result<any>> {
        const session = neo4JDriver.session();

        await session.run(queries.deleteFriendsRelationship(user1, user2))
            .then(async (result: any) => {

                const deleteNodeSession = neo4JDriver.session();
                await deleteNodeSession.run(queries.deleteFriendsNodes)
                    .catch(function (error: any) {
                        logger.error(error);
                        process.exit(130);
                    })
                deleteNodeSession.close();

            })
            .catch(function (error: any) {
                logger.error(error);
                process.exit(130);
                session.close();
                return new Result<Boolean>(error, false);
            });
        session.close();
        return new Result<Boolean>(undefined, true);
    }

    // createThread(user: User, title: String, content: String): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // createUser(username: String, password: String): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // deleteComment(commentId: ObjectId): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    //
    // deleteThread(threadId: ObjectId): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // deleteUser(username: String, password: String): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // getComment(commentId: ObjectId): Promise<Result<Comment>> {
    //     return undefined;
    // }
    //
    // getCommentsForThread(threadId: ObjectId): Promise<Result<Array<Comment>>> {
    //     return undefined;
    // }
    //
    // getThread(threadId: ObjectId): Promise<Result<Thread>> {
    //     return undefined;
    // }
    //
    // getThreads(): Promise<Result<Array<Thread>>> {
    //     return undefined;
    // }
    //
    // getUser(username: String): Promise<Result<User>> {
    //     return undefined;
    // }
    //
    // postComment(threadId: ObjectId): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // updateThread(threadId: ObjectId, content: String): Promise<Result<Boolean>> {
    //     return undefined;
    // }
    //
    // updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result<Boolean>> {
    //     return undefined;
    // }


}
