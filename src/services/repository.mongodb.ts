import {RepositoryInterface} from './repository.interface';
import {User} from '../models/user';
import {Result} from '../models/result';
import {CommentModel, ThreadModel, UserModel} from "../schemas/schema.mongoDb";
import {logger} from "../app";
import {Document} from "mongoose";
import {Comment} from "../models/comment";

export class RepositoryMongodb implements RepositoryInterface {

    constructor() {
    }

    createFriends(username1: string, username2: string): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    deleteFriends(username1: string, username2: string): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    getFriends(username: String): Promise<Result> {
        throw 'Method not implemented in MongoDB';
    }

    async createThread(username: String, title: String, content: String): Promise<Result> {
        let result = new Result(undefined, undefined);

        await ThreadModel.create({
            user: username,
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

    async deleteComment(commentId: Object): Promise<Result> {
        let result = new Result(undefined, true);
        await CommentModel.deleteOne({_id: commentId}).catch((err: any) => result = new Result(err, undefined));
        return result;
    }

    async deleteThread(threadId: Object): Promise<Result> {
        let result = new Result(undefined, true);
        await ThreadModel.deleteOne({_id: threadId}).catch((err: any) => result = new Result(err, undefined));
        return result;
    }

    async deleteUser(username: String, password: String): Promise<Result> {
        let result = new Result(undefined, true);
        let passwordOkay = false;
        await UserModel.find({username: username}, (err: any, res: Document[]) => passwordOkay = (res[0].get('password') === password));

        if (passwordOkay) {
            await ThreadModel.deleteOne({username: username}).catch((err: any) => result = new Result(err, undefined));
        }
        return result;
    }

    async getComment(commentId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);
        CommentModel.find({_id: commentId}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                let comment;
                if (res[0].get('thread')) {
                    comment = new Comment(res[0].get('user'), res[0].get('content'), res[0].get('thread'))
                } else if (res[0].get('comment')) {
                    comment = new Comment(res[0].get('user'), res[0].get('content'), res[0].get('comment'))
                }
            }
        });
        return result;
    }

    async getCommentsForThread(threadId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);
        CommentModel.find({$or: [{thread: threadId}, {comment: threadId}]}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                logger.debug(JSON.stringify(res));
            }
        });
        return result;
    }

    async getThread(threadId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);
        await ThreadModel.find({_id: threadId}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                result = new Result(undefined, res[0]);
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
                result = new Result(undefined, res);
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

    async postComment(username: String, content: String, threadId: Object): Promise<Result> {
        let result = new Result(undefined, false);

        await CommentModel.create({
            user: username,
            content: content,
            thread: threadId
        }, (err: any, res: Document[]) => {
            if (err) {
                logger.error(err);
                result = new Result(err, false);
            } else {
                result = new Result(undefined, true)
            }
        });
        return result;
    }

    async updateThread(threadId: Object, content: String): Promise<Result> {
        let result = new Result(undefined, false);
        await ThreadModel.update({_id: threadId}, {content: content}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, false);
            } else {
                result = new Result(undefined, true);
            }
        });
        return result;
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result> {
        throw 'Unsupported operation';
    }
}
