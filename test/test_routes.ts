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

describe('createUser test', () => {
    it('should create a new user', (done: any) => {
        chai.request(app)
            .post('/user')
            .send({
                'email': 'test@gmail.com',
                'username': 'Test',
                'password': 'tester123'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    })
});

describe('getUser test', () => {
    it('should return user Test', (done: any) => {
        chai.request(app)
            .get('/user/Test')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('updateUser test', () => {
    it('should update the created user', (done: any) => {
        chai.request(app)
            .put('/user/Test')
            .send({
                'oldPassword': 'tester123',
                'newPassword': 'newpassword123'
            })
            .end(function(err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
});

describe('deleteUser test', () => {
    it('should delete the created user', (done: any) => {
        chai.request(app)
            .delete('/user/Test')
            .send({
                'password': 'newpassword123'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
});

describe('getFriends test', () => {
    it('should return the friends', (done: any) => {
        chai.request(app)
            .get('/user/Arnold/friends')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
})
