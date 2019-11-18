import {RepositoryInterface} from "./repository.interface";
import {Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {User} from "../models/user";
import {Result} from "../models/result";
import {Comment} from "../models/comment";
import {Friends} from "../models/friends";
import {Thread} from "../models/thread";

import {mongoDb} from './service';

export class RepositoryMongodb implements RepositoryInterface {

    createFriends(user1: User, user2: User): Result<Boolean> {
        throw 'Unsupported operation';
    }

    createThread(user: User, title: String, content: String): Result<Boolean> {
        throw 'Unsupported operation';
    }

    createUser(username: String, password: String): Result<Boolean> {
        throw 'Unsupported operation';
    }

    deleteComment(commentId: ObjectId): Result<Boolean> {
        throw 'Unsupported operation';
    }

    deleteFriends(user1: User, user2: User): Result<Boolean> {
        throw 'Unsupported operation';
    }

    deleteThread(threadId: ObjectId): Result<Boolean> {
        throw 'Unsupported operation';
    }

    deleteUser(username: String, password: String): Result<Boolean> {
        throw 'Unsupported operation';
    }

    getComment(commentId: ObjectId): Result<Comment> {
        throw 'Unsupported operation';
    }

    getCommentsForThread(threadId: ObjectId): Result<Array<Comment>> {
        throw 'Unsupported operation';
    }

    getFriends(username: String): Result<Array<Friends>> {
        throw 'Unsupported operation';
    }

    getThread(threadId: ObjectId): Result<Thread> {
        throw 'Unsupported operation';
    }

    getThreads(): Result<Array<Thread>> {
        throw 'Unsupported operation';
    }

    getUser(username: String): Result<User> {
        throw 'Unsupported operation';
    }

    postComment(threadId: ObjectId): Result<Boolean> {
        throw 'Unsupported operation';
    }

    updateThread(threadId: ObjectId, content: String): Result<Boolean> {
        throw 'Unsupported operation';
    }

    updateUser(username: String, oldPassword: String, newPassword: String): Result<Boolean> {
        throw 'Unsupported operation';
    }

}
