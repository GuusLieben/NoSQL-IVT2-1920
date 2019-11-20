import {User} from "./user";

export class Thread {

    constructor(user: User, title: String, content: String) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.upvotedBy = [];
        this.downvotedBy = [];
        this.totalVotes = 0;
    }

    user: User;
    title: String;
    content: String;
    upvotedBy: [];
    downvotedBy: [];
    totalVotes: Number;
}
