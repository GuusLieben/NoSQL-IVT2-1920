import {RepositoryInterface} from './repository.interface';
import {User} from '../models/user';
import {Result} from '../models/result';
import {Comment} from "../models/comment";
import {Thread} from "../models/thread";

export class RepositoryMongodb implements RepositoryInterface {

    createFriends(user1: User, user2: User): Promise<Result<Boolean>> {
        throw 'Method not implemented in MongoDB';
    }

    deleteFriends(user1: User, user2: User): Promise<Result<Boolean>> {
        throw 'Method not implemented in MongoDB';
    }

    getFriends(username: String): Promise<Result<string[]>> {
        throw 'Method not implemented in MongoDB';
    }

    createThread(user: User, title: String, content: String): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    createUser(username: String, password: String): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    deleteComment(commentId: Object): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    deleteThread(threadId: Object): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    deleteUser(username: String, password: String): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    getComment(commentId: Object): Promise<Result<Comment>> {
        throw 'Unsupported operation';
    }

    getCommentsForThread(threadId: Object): Promise<Result<Array<Comment>>> {
        throw 'Unsupported operation';
    }

    getThread(threadId: Object): Promise<Result<Thread>> {
        throw 'Unsupported operation';
    }

    getThreads(): Promise<Result<Array<Thread>>> {
        throw 'Unsupported operation';
    }

    getUser(username: String): Promise<Result<User>> {
        throw 'Unsupported operation';
    }

    postComment(threadId: Object): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    updateThread(threadId: Object, content: String): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result<Boolean>> {
        throw 'Unsupported operation';
    }


}
