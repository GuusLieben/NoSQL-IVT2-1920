export class Comment {
    user: Object;
    content: String;
    parent: Object;

    constructor(user: Object, content: String, parent: Object) {
        this.user = user;
        this.content = content;
        this.parent = parent;
    }
}
