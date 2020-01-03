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

describe('User Schema', () => {
    it('should have a email property', (done: any) => {
        expect(User.obj).to.have.property('email');
        expect(User.obj.email).to.have.property('required');
        done();
    });
});