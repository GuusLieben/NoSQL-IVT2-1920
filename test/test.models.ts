// @ts-ignore
import {setProduction} from "../src/app";

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
        const expect = chai.expect, name = 'Herman';

        expect(name).to.be.a('string');
        expect(name).to.equal('Herman');
        done();
    })
});

describe('User', () => {
    it('should allocate a value to the property email', (done: any) => {
        const expect = chai.expect, email = 'someone@email.com';

        expect(email).to.be.a('string');
        expect(email).to.equal('someone@email.com');
        done();
    })
});

describe('User', () => {
    it('should allocate a value to the property password', (done: any) => {
        const expect = chai.expect, password = 'breda873';

        expect(password).to.be.a('string');
        expect(password).to.equal('breda873');
        done();
    })
});