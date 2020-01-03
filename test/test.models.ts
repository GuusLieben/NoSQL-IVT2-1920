// @ts-ignore
import {setProduction} from "../src/app";
import {User} from "../src/models/user";
import {Thread} from "../src/models/thread";
import {Comment} from "../src/models/comment";

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

describe('User', () => {
    it('should allocate a value to the property name', (done: any) => {
        const user = new User('Herman', "", "");

        expect(user.name).to.be.a('string');
        expect(user.name).to.equal('Herman');
        done();
    })
});

describe('User', () => {
    it('should allocate a value to the property email', (done: any) => {
        const user = new User("", "someone@email.com", "");

        expect(user.email).to.be.a('string');
        expect(user.email).to.equal('someone@email.com');
        done();
    })
});

describe('User', () => {
    it('should allocate a value to the property password', (done: any) => {
        const user = new User("", "", "breda873");

        expect(user.password).to.be.a('string');
        expect(user.password).to.equal('breda873');
        done();
    })
});

describe('Thread', () => {
    it('should have a property user as type User', (done: any) => {
        const thread = new Thread(new User("", "", ""), "", "");

        expect(thread.user).to.be.a('Object');
        done();
    })
});

describe('Thread', () => {
    it('should have a property user with a property name', (done: any) => {
        const thread = new Thread(new User("Herman", "", ""), "", "");

        expect(thread.user.name).to.be.a('string');
        expect(thread.user.name).to.equal('Herman');
        done();
    })
});

describe('Thread', () => {
    it('should have a property user with a property email', (done: any) => {
        const thread = new Thread(new User("", "someone@email.com", ""), "", "");

        expect(thread.user.email).to.be.a('string');
        expect(thread.user.email).to.equal('someone@email.com');
        done();
    })
});

describe('Thread', () => {
    it('should have a property user with a property password', (done: any) => {
        const thread = new Thread(new User("", "", "breda873"), "", "");

        expect(thread.user.password).to.be.a('string');
        expect(thread.user.password).to.equal('breda873');
        done();
    })
});

describe('Thread', () => {
    it('should allocate a value to property title', (done: any) => {
        const thread = new Thread(new User("", "", ""), "a thread", "");

        expect(thread.title).to.be.a('string');
        expect(thread.title).to.equal('a thread');
        done();
    })
});

describe('Thread', () => {
    it('should allocate a value to property content', (done: any) => {
        const thread = new Thread(new User("", "", ""), "", "this is the content");

        expect(thread.content).to.be.a('string');
        expect(thread.content).to.equal('this is the content');
        done();
    })
});

describe('Thread', () => {
    it('should test if property totalVotes not null is', (done: any) => {
        const thread = new Thread(new User("", "", ""), "", "");

        expect(thread.totalVotes).to.be.a('Number');
        expect(thread.totalVotes).to.not.equal(null);
        done();
    })
});

describe('Thread', () => {
    it('should test if property upvotedBy not null is', (done: any) => {
        const thread = new Thread(new User("", "", ""), "", "");

        expect(thread.upvotedBy).to.be.a('Array');
        expect(thread.upvotedBy).to.not.equal(null);
        done();
    })
});

describe('Thread', () => {
    it('should test if property downvotedBy not null is', (done: any) => {
        const thread = new Thread(new User("", "", ""), "", "");

        expect(thread.downvotedBy).to.be.a('Array');
        expect(thread.downvotedBy).to.not.equal(null);
        done();
    })
});

describe('Comment', () => {
    it('should have a property user as type User', (done: any) => {
        const comment = new Comment(new User("", "", ""), "", "");

        expect(comment.user).to.be.a('Object');
        done();
    })
});

describe('Comment', () => {
    it('should have a property user with a property name', (done: any) => {
        const comment = new Comment(new User("Herman", "", ""), "", "");

        expect(comment.user.name).to.be.a('string');
        expect(comment.user.name).to.equal('Herman');
        done();
    })
});

describe('Comment', () => {
    it('should have a property user with a property email', (done: any) => {
        const comment = new Comment(new User("", "someone@email.com", ""), "", "");

        expect(comment.user.email).to.be.a('string');
        expect(comment.user.email).to.equal('someone@email.com');
        done();
    })
});

describe('Comment', () => {
    it('should have a property user with a property password', (done: any) => {
        const comment = new Comment(new User("", "", "breda873"), "", "");

        expect(comment.user.password).to.be.a('string');
        expect(comment.user.password).to.equal('breda873');
        done();
    })
});

describe('Comment', () => {
    it('should allocate a value to property content', (done: any) => {
        const comment = new Comment(new User("", "", ""), "this is the content", "");

        expect(comment.content).to.be.a('string');
        expect(comment.content).to.equal('this is the content');
        done();
    })
});

describe('Comment', () => {
    it('should have a property user as type User', (done: any) => {
        const comment = new Comment(new User("", "", ""), "", new Comment(new User("", "", ""), "", ""));

        expect(comment.parent).to.be.a('Object');
        done();
    })
});