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

export class RepositoryNeo4j implements RepositoryInterface {
    async createFriends(user1: User, user2: User): Promise<Result<Boolean>> {
        const session = neo4JDriver.session();

        await session.run(queries.createFriendsQuery(user1, user2))
            .then((result: { records: any[]; }) => {
                result.records.forEach(async record => {
                    console.log(record);
                })
            })
            .catch(function (error: any) {
                console.log(error);
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
    // deleteFriends(user1: User, user2: User): Promise<Result<Boolean>> {
    //     return undefined;
    // }
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
    // getFriends(username: String): Promise<Result<Array<Friends>>> {
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
