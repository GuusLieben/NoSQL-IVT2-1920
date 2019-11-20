import {mongoose} from '../services/service';

const Schema = mongoose.Schema;

const User = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});
export const UserModel = mongoose.model('User', User);

const Thread = new Schema({
    user: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    upvotedBy: {type: [{type: String}], default: []},
    downvotedBy: {type: [{type: String}], default: []}
});
Thread.virtual('totalVotes').get(function () {
    return this.upvotedBy.length - this.downvotedBy.length;
});
export const ThreadModel = mongoose.model('Thread', Thread);

const Comment = new Schema({
    user: {type: String, required: true},
    content: {type: String, required: true},
    thread: {type: mongoose.Schema.ObjectId, ref:'Thread'},
    comment: {type: mongoose.Schema.ObjectId, ref:'Comment'},
    upvotedBy: {type: [{type: String}], default: []},
    downvotedBy: {type: [{type: String}], default: []}
});
Comment.virtual('totalVotes').get(function () {
    return this.upvotedBy.length - this.downvotedBy.length;
});
export const CommentModel = mongoose.model('Comment', Comment);
