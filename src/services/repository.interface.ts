import {Comment} from '../models/comment';
import {User} from '../models/user';
import {Thread} from '../models/thread';
import {Result} from '../models/result';

export interface RepositoryInterface {
    // Comments
    postComment(username: String, content: String, threadId: Object): Promise<Result>,
    deleteComment(commentId: Object): Promise<Result>,
    getCommentsForThread(threadId: Object): Promise<Result>,
    getComment(commentId: Object): Promise<Result>,

    // Friends
    createFriends(username1: string, username2: string): Promise<Result>,
    deleteFriends(username1: string, username2: string): Promise<Result>,
    getFriends(username: String): Promise<Result>,

    // Threads
    createThread(username: String, title: String, content: String): Promise<Result>,
    updateThread(threadId: Object, content: String): Promise<Result>,
    deleteThread(threadId: Object): Promise<Result>,
    getThreads(): Promise<Result>,
    getThread(threadId: Object): Promise<Result>,
    
    // Users
    createUser(username: String, email: String, password: String): Promise<Result>,
    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result>,
    deleteUser(username: String, password: String): Promise<Result>,
    getUser(username: String): Promise<Result>
}
