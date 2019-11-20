import {Comment} from '../models/comment';
import {User} from '../models/user';
import {Thread} from '../models/thread';
import {Result} from '../models/result';

export interface RepositoryInterface {
    // Comments
    postComment(threadId: Object): Promise<Result<Boolean>>,
    deleteComment(commentId: Object): Promise<Result<Boolean>>,
    getCommentsForThread(threadId: Object): Promise<Result<Array<Comment>>>,
    getComment(commentId: Object): Promise<Result<Comment>>,

    // Friends
    createFriends(user1: User, user2: User): Promise<Result<Boolean>>,
    deleteFriends(user1: User, user2: User): Promise<Result<any>>,
    getFriends(username: String): Promise<Result<string[]>>,

    // Threads
    createThread(user: User, title: String, content: String): Promise<Result<Boolean>>,
    updateThread(threadId: Object, content: String): Promise<Result<Boolean>>,
    deleteThread(threadId: Object): Promise<Result<Boolean>>,
    getThreads(): Promise<Result<Array<Thread>>>,
    getThread(threadId: Object): Promise<Result<Thread>>,
    
    // Users
    createUser(username: String, password: String): Promise<Result<Boolean>>,
    updateUser(username: String, oldPassword: String, newPassword: String): Promise<Result<Boolean>>,
    deleteUser(username: String, password: String): Promise<Result<Boolean>>,
    getUser(username: String): Promise<Result<User>>
}
