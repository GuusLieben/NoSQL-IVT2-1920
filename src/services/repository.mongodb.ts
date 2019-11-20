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
            result = new Result(undefined, {
                status: true,
                thread: res.get('_id')
            });
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
        let result = new Result(undefined, false);
        let passwordOkay = false;
        await UserModel.find({username: username}, (err: any, res: Document[]) => {
            if (res[0]) {
                passwordOkay = (res[0].get('password') === password);
            }
        });

        if (passwordOkay) {
            await ThreadModel.deleteOne({username: username}).then((res: any) => {
                result = new Result(undefined, true);
            }).catch((err: any) => result = new Result(err, undefined));
        }
        return result;
    }

    async getComment(commentId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);
        await CommentModel.find({_id: commentId}, (err: any, res: any) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                let comment;
                if (res.length > 0) {
                    if (res[0].get('thread')) {
                        comment = new Comment(res[0].get('user'), res[0].get('content'), res[0].get('thread'))
                    } else if (res[0].get('comment')) {
                        comment = new Comment(res[0].get('user'), res[0].get('content'), res[0].get('comment'))
                    }
                    result = new Result(undefined, comment);
                } else {
                    // In case it's not an array
                    result = new Result(undefined, []);
                }
            }
        });
        return result;
    }

    async getCommentsForThread(threadId: Object): Promise<Result> {
        let result = new Result(undefined, undefined);

        await CommentModel.find({$or: [{thread: threadId}, {comment: threadId}]}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, undefined);
            } else {
                logger.warn('Reached find');
                result = new Result(undefined, res);
            }
        });
        logger.warn('Reached end');
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
        await ThreadModel.find({}, (err: any, res: any) => {
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
                if (res[0]) {
                    result = new Result(undefined, new User(res[0].get('username'), res[0].get('email'), res[0].get('password')));
                } else {
                    result = new Result('Could not find user', undefined);
                }
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
        }).then((res: Document) => {
            logger.info('Reached update');
            result = new Result(undefined, {
                status: true,
                comment: res.get('_id')
            })
        }).catch((err: any) => {
            logger.error(err);
            result = new Result(err, false);
        });

        logger.info('Reached end');
        return result;
    }

    async postCommentOnComment(threadId: Object, username: String, content: String): Promise<Result> {
        let result = new Result(undefined, false);

        await CommentModel.create({
            user: username,
            content: content,
            comment: threadId
        }).then((res: Document) => {
            logger.info('Reached update');
            result = new Result(undefined, {
                status: true,
                comment: res.get('_id')
            })
        }).catch((err: any) => {
            logger.error(err);
            result = new Result(err, false);
        });

        logger.info('Reached end');
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

    async updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result> {
        let result = new Result(undefined, false);

        await ThreadModel.find({username: username}, (err: any, res: Document[]) => {
            if (err) {
                result = new Result(err, false);
            } else {
                result = new Result(undefined, true);
            }
        });

        return result;
    }

    async upvote(threadId: Object, username: String): Promise<Result> {
        return await vote(threadId, username, {upvotedBy: 1, _id: 0}, 'upvotedBy');
    }

    async downvote(threadId: Object, username: String): Promise<Result> {
        return await vote(threadId, username, {downvotedBy: 1, _id: 0}, 'downvotedBy');
    }
}

async function vote(threadId: Object, username: String, projection: any, field: String) {
    let result = new Result(undefined, false);
    let currentVotes: any[] = [];
    await ThreadModel.find({_id: threadId}, projection).then((res: any) => {
        currentVotes = res[0].get(field);
    }).catch((err: any) => {
        result = new Result(err, false);
    });

    if (currentVotes.indexOf(username) >= 0) {
        return new Result('You cannot upvote the same parent twice', false);
    } else {
        await ThreadModel.update({_id: threadId}, {$push: {upvotedBy: username}}).then((res: any) => {
            logger.debug(JSON.stringify(res));
            result = new Result(undefined, true);
        }).catch((err: any) => {
            result = new Result(err, false);
        });
    }
    return result;
}
