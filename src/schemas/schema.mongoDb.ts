import {mongoose} from '../services/service';

const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
export const UserModel = mongoose.model('User', User);

const Thread = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    upvotedBy: {type: [{type: mongoose.Schema.ObjectId, ref: 'User'}], default: []},
    downvotedBy: {type: [{type: mongoose.Schema.ObjectId, ref: 'User'}], default: []}
});
Thread.virtual('totalVotes').get(function () {
    return this.upvotedBy.length - this.downvotedBy.length;
});
export const ThreadModel = mongoose.model('Thread', Thread);

const Comment = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref:'User', required: true},
    content: {type: String, required: true},
    thread: {type: mongoose.Schema.ObjectId, ref:'Thread'},
    comment: {type: mongoose.Schema.ObjectId, ref:'Comment'},
    upvotedBy: {type: [{type: mongoose.Schema.ObjectId, ref: 'User'}], default: []},
    downvotedBy: {type: [{type: mongoose.Schema.ObjectId, ref: 'User'}], default: []}
});
Comment.virtual('totalVotes').get(function () {
    return this.upvotedBy.length - this.downvotedBy.length;
});
export const CommentModel = mongoose.model('Comment', Comment);
