export class Comment {
    user: any;
    content: String;
    parent: any;

    constructor(user: Object, content: String, parent: Object) {
        this.user = user;
        this.content = content;
        this.parent = parent;
    }
}
