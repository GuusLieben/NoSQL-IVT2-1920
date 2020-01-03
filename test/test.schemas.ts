// @ts-ignore
import {setProduction} from "../src/app";
import {User,Thread,Comment, UserModel} from '../src/schemas/schema.mongoDb';
import {mongoose} from '../src/services/service';

const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chaiHttp = require('chai-http');
const app = require('../src/app').testable;
const expect = require('chai').expect;
const before = mocha.before;

chai.use(chaiHttp);

before((done: any) => {
    setProduction(false);
    setTimeout(() => done(), 2500);
});

//
describe('User Schema', () => {
    it('should have a email property', (done: any) => {
        expect(User.obj).to.have.property('email');
        done();
    });
});

describe('User Schema', () => {
    it('should have email as a required property', (done: any) => {
        expect(User.obj.email).to.have.property('required');
        expect(User.obj.email.required).to.equal(true);
        done();
    });
});

describe('User Schema', () => {
    it('should have the email property as String', (done: any) => {
        expect(User.obj.email).to.have.property('type');
        expect(User.obj.email.type).to.equal(String);
        done();
    });
});

//
describe('User Schema', () => {
    it('should have a username property', (done: any) => {
        expect(User.obj).to.have.property('username');
        done();
    });
});

describe('User Schema', () => {
    it('should have username as a required property', (done: any) => {
        expect(User.obj.username).to.have.property('required');
        expect(User.obj.username.required).to.equal(true);
        done();
    });
});

describe('User Schema', () => {
    it('should have username as a unique property', (done: any) => {
        expect(User.obj.username).to.have.property('unique');
        expect(User.obj.username.unique).to.equal(true);
        done();
    });
});


describe('User Schema', () => {
    it('should have the username property as String', (done: any) => {
        expect(User.obj.username).to.have.property('type');
        expect(User.obj.username.type).to.equal(String);
        done();
    });
});

//
describe('User Schema', () => {
    it('should have a password property', (done: any) => {
        expect(User.obj).to.have.property('password');
        done();
    });
});

describe('User Schema', () => {
    it('should have password as a required property', (done: any) => {
        expect(User.obj.password).to.have.property('required');
        expect(User.obj.password.required).to.equal(true);
        done();
    });
});

describe('User Schema', () => {
    it('should have the password property as String', (done: any) => {
        expect(User.obj.password).to.have.property('type');
        expect(User.obj.password.type).to.equal(String);
        done();
    });
});

//
describe('Thread Schema', () => {
    it('should have a user property', (done: any) => {
        expect(Thread.obj).to.have.property('user');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have user as a required property', (done: any) => {
        expect(Thread.obj.user).to.have.property('required');
        expect(Thread.obj.user.required).to.equal(true);
        done();
    });
});

describe('Thread Schema', () => {
    it('should have the user property as String', (done: any) => {
        expect(Thread.obj.user).to.have.property('type');
        expect(Thread.obj.user.type).to.equal(String);
        done();
    });
});

//
describe('Thread Schema', () => {
    it('should have a title property', (done: any) => {
        expect(Thread.obj).to.have.property('title');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have title as a required property', (done: any) => {
        expect(Thread.obj.title).to.have.property('required');
        expect(Thread.obj.title.required).to.equal(true);
        done();
    });
});

describe('Thread Schema', () => {
    it('should have the title property as String', (done: any) => {
        expect(Thread.obj.title).to.have.property('type');
        expect(Thread.obj.title.type).to.equal(String);
        done();
    });
});

//
describe('Thread Schema', () => {
    it('should have a content property', (done: any) => {
        expect(Thread.obj).to.have.property('content');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have content as a required property', (done: any) => {
        expect(Thread.obj.content).to.have.property('required');
        expect(Thread.obj.content.required).to.equal(true);
        done();
    });
});

describe('Thread Schema', () => {
    it('should have the content property as String', (done: any) => {
        expect(Thread.obj.content).to.have.property('type');
        expect(Thread.obj.content.type).to.equal(String);
        done();
    });
});

//
describe('Thread Schema', () => {
    it('should have a upvotedBy property', (done: any) => {
        expect(Thread.obj).to.have.property('upvotedBy');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have upvotedBy with default value', (done: any) => {
        expect(Thread.obj.upvotedBy).to.have.property('default');
        expect(Thread.obj.upvotedBy.default).to.be.a('array');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have upvotedBy with type array', (done: any) => {
        expect(Thread.obj.upvotedBy).to.have.property('type');
        expect(Thread.obj.upvotedBy.type).to.be.a('array');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have upvotedBy with type array with rule type String', (done: any) => {
        expect(Thread.obj.upvotedBy.type[0]).to.have.property('type');
        expect(Thread.obj.upvotedBy.type[0].type).to.equal(String);
        done();
    });
});

//
describe('Thread Schema', () => {
    it('should have a downvotedBy property', (done: any) => {
        expect(Thread.obj).to.have.property('downvotedBy');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have downvotedBy with default value', (done: any) => {
        expect(Thread.obj.downvotedBy).to.have.property('default');
        expect(Thread.obj.downvotedBy.default).to.be.a('array');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have downvotedBy with type array', (done: any) => {
        expect(Thread.obj.downvotedBy).to.have.property('type');
        expect(Thread.obj.downvotedBy.type).to.be.a('array');
        done();
    });
});

describe('Thread Schema', () => {
    it('should have downvotedBy with type array with rule type String', (done: any) => {
        expect(Thread.obj.downvotedBy.type[0]).to.have.property('type');
        expect(Thread.obj.downvotedBy.type[0].type).to.equal(String);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a user property', (done: any) => {
        expect(Comment.obj).to.have.property('user');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have user as a required property', (done: any) => {
        expect(Comment.obj.user).to.have.property('required');
        expect(Comment.obj.user.required).to.equal(true);
        done();
    });
});

describe('Comment Schema', () => {
    it('should have the user property as String', (done: any) => {
        expect(Comment.obj.user).to.have.property('type');
        expect(Comment.obj.user.type).to.equal(String);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a content property', (done: any) => {
        expect(Comment.obj).to.have.property('user');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have content as a required property', (done: any) => {
        expect(Comment.obj.content).to.have.property('required');
        expect(Comment.obj.content.required).to.equal(true);
        done();
    });
});

describe('Comment Schema', () => {
    it('should have the content property as String', (done: any) => {
        expect(Comment.obj.content).to.have.property('type');
        expect(Comment.obj.content.type).to.equal(String);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a thread property', (done: any) => {
        expect(Comment.obj).to.have.property('thread');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have thread as a reference property', (done: any) => {
        expect(Comment.obj.thread).to.have.property('ref');
        expect(Comment.obj.thread.ref).to.equal('Thread');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have the thread property as String', (done: any) => {
        expect(Comment.obj.thread).to.have.property('type');
        expect(Comment.obj.thread.type).to.equal(mongoose.Schema.ObjectId);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a comment property', (done: any) => {
        expect(Comment.obj).to.have.property('comment');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have comment as a reference property', (done: any) => {
        expect(Comment.obj.comment).to.have.property('ref');
        expect(Comment.obj.comment.ref).to.equal('Comment');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have the comment property as String', (done: any) => {
        expect(Comment.obj.comment).to.have.property('type');
        expect(Comment.obj.comment.type).to.equal(mongoose.Schema.ObjectId);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a upvotedBy property', (done: any) => {
        expect(Comment.obj).to.have.property('upvotedBy');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have upvotedBy with default value', (done: any) => {
        expect(Comment.obj.upvotedBy).to.have.property('default');
        expect(Comment.obj.upvotedBy.default).to.be.a('array');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have upvotedBy with type array', (done: any) => {
        expect(Comment.obj.upvotedBy).to.have.property('type');
        expect(Comment.obj.upvotedBy.type).to.be.a('array');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have upvotedBy with type array with rule type String', (done: any) => {
        expect(Comment.obj.upvotedBy.type[0]).to.have.property('type');
        expect(Comment.obj.upvotedBy.type[0].type).to.equal(String);
        done();
    });
});

//
describe('Comment Schema', () => {
    it('should have a downvotedBy property', (done: any) => {
        expect(Comment.obj).to.have.property('downvotedBy');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have downvotedBy with default value', (done: any) => {
        expect(Comment.obj.downvotedBy).to.have.property('default');
        expect(Comment.obj.downvotedBy.default).to.be.a('array');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have downvotedBy with type array', (done: any) => {
        expect(Comment.obj.downvotedBy).to.have.property('type');
        expect(Comment.obj.downvotedBy.type).to.be.a('array');
        done();
    });
});

describe('Comment Schema', () => {
    it('should have downvotedBy with type array with rule type String', (done: any) => {
        expect(Comment.obj.downvotedBy.type[0]).to.have.property('type');
        expect(Comment.obj.downvotedBy.type[0].type).to.equal(String);
        done();
    });
});