// @ts-ignore
import {setProduction} from "../src/app";
import {User,Thread,Comment} from '../src/schemas/schema.mongoDb';

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