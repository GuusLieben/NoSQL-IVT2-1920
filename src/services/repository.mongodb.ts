import {RepositoryInterface} from './repository.interface';
import {User} from '../models/user';
import {Result} from '../models/result';
import {Comment} from "../models/comment";
import {Thread} from "../models/thread";
import {ThreadModel, UserModel} from "../schemas/schema.mongoDb";
import {logger} from "../app";
import {Document} from "mongoose";

export class RepositoryMongodb implements RepositoryInterface {

    createFriends(user1: User, user2: User): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    deleteFriends(user1: User, user2: User): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    getFriends(username: String): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    async createThread(username: String, title: String, content: String): Promise<Result> {
        let result = new Result(undefined, undefined);
        let userId;

        await UserModel.find({username: username}, async (err: any, res: Document[]) => {
            if (err) {
                console.warn('Reached error on user');
                result = new Result(err, false);
            } else {
                userId = res[0].get('_id');
            }
        }).catch((err: any) => {
            console.warn('Caught error on user');
            result = new Result(err, false);
        });

        await ThreadModel.create({
            user: userId,
            title: title,
            content: content
        }).then(async (res: any) => {
            result = new Result(undefined, true);
            logger.debug('Created Thread : ' + JSON.stringify(res));
        }).catch((err: any) => {
            console.warn('Caught error on thread');
            result = new Result(err, false);
        });

        return result;
    }

    async createUser(username: String, email: String, password: String): Promise<Result> {
        let result = new Result(undefined, undefined);
        await UserModel.create({
            email: email,
            username: username,
            password: password
        }).then((res: any) => {
            logger.debug('Created User : ' + JSON.stringify(res));
            result = new Result(undefined, true);
        }).catch((err: any) => {
            logger.error(err);
            result = new Result(err, false);
        });
        return result;
    }

    deleteComment(commentId: Object): Promise<Result> {
        throw 'Unsupported operation';
    }

    deleteThread(threadId: Object): Promise<Result> {
        throw 'Unsupported operation';
    }

    deleteUser(username: String, password: String): Promise<Result> {
        throw 'Unsupported operation';
    }

    getComment(commentId: Object): Promise<Result> {
        throw 'Unsupported operation';
    }

    getCommentsForThread(threadId: Object): Promise<Result> {
        throw 'Unsupported operation';
    }

    async getThread(threadId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);
        await ThreadModel.find({_id: threadId}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                logger.debug(JSON.stringify(res));
            }
        }).catch((err: any) => {
            result = new Result(err, undefined);
        });
        return result;
    }

    async getThreads(): Promise<Result> {
        let result = new Result(undefined, undefined);
        await ThreadModel.find({}, (err: any, res: Document[]) => {
           if (err) {
               result = new Result(err, undefined);
           } else {
               logger.info('Threads : ' + res.length);
               logger.info(JSON.stringify(res));
           }
        });
        return result;
    }

    async getUser(username: String): Promise<Result> {
        let result = new Result(undefined, undefined);
        await UserModel.find({username: username}, (err: any, res: Document[]) => {
            if (err) {
                logger.error('Reached error on getUser');
                result = new Result(err, undefined);
            } else {
                result = new Result(undefined, new User(res[0].get('username'), res[0].get('email'), res[0].get('password')));
            }
        }).catch((err: any) => {
            logger.error('Caught error on getUser');
            result = new Result(err, undefined);
        });
        return result;
    }

    postComment(threadId: Object): Promise<Result> {
        throw 'Unsupported operation';
    }

    updateThread(threadId: Object, content: String): Promise<Result> {
        throw 'Unsupported operation';
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result> {
        throw 'Unsupported operation';
    }


}
