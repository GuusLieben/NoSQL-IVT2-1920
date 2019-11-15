import {Types} from "mongoose";
import ObjectId = Types.ObjectId;
import {Comment} from "../models/comment";
import {User} from "../models/user";
import {Thread} from "../models/thread";
import {Result} from "../models/result";
import {Friends} from "../models/friends";

export interface RepositoryInterface {
    // Comments
    postComment(threadId: ObjectId): Result<Boolean>,
    deleteComment(commentId: ObjectId): Result<Boolean>,
    getCommentsForThread(threadId: ObjectId): Result<Array<Comment>>,
    getComment(commentId: ObjectId): Result<Comment>,

    // Friends
    createFriends(user1: User, user2: User): Result<Boolean>,
    deleteFriends(user1: User, user2: User): Result<Boolean>,
    getFriends(username: String): Result<Array<Friends>>,

    // Threads
    createThread(user: User, title: String, content: String): Result<Boolean>,
    updateThread(threadId: ObjectId, content: String): Result<Boolean>,
    deleteThread(threadId: ObjectId): Result<Boolean>,
    getThreads(): Result<Array<Thread>>,
    getThread(threadId: ObjectId): Result<Thread>,
    
    // Users
    createUser(username: String, password: String): Result<Boolean>,
    updateUser(username: String, oldPassword: String, newPassword: String): Result<Boolean>,
    deleteUser(username: String, password: String): Result<Boolean>,
    getUser(username: String): Result<User>
}
