const mongo = require('mongoose');
const Schema = mongo.Schema;

const User = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
export const UserModel = mongo.model('User', User);

const Thread = new Schema({
    user: {type: mongo.Schema.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    upvotedBy: {type: [{type: mongo.Schema.ObjectId, ref: 'User'}], default: []},
    downvotedBy: {type: [{type: mongo.Schema.ObjectId, ref: 'User'}], default: []},
    totalVotes: Number
});
Thread.virtual('totalVotes').get(function () {
    return this.upvotedBy.length - this.downvotedBy.length;
});
export const ThreadModel = mongo.model('Thread', Thread);

const Comment = new Schema({
    user: {type: User, required: true},
    content: {type: String, required: true},
    thread: {type: Thread},
    comment: {type: this}
});
export const CommentModel = mongo.model('Comment', Comment);
