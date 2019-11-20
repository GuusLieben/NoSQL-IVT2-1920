// @ts-ignore
import {setProduction} from "../src/app";

const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chaiHttp = require('chai-http');
const app = require('../src/app').testable;
const expect = require('chai').expect;
const assert = require('chai').assert;
const before = mocha.before;

chai.use(chaiHttp);

before((done: any) => {
    setProduction(false);
    setTimeout(() => done(), 2500);
})

// describe('createUser test', () => {
//     it('should create a new user', (done: any) => {
//
//     })
// })

// User tests //

describe('getUser test', () => {
    it('should return user Guus', (done: any) => {
        chai.request(app)
            .get('/user/guuslieben')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
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

    it('should delete the created user', (done: any) => {
        chai.request(app)
            .delete('/user/Test')
            .send({
                'password': 'tester123'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
});

describe('deleteUser test', () => {
    it('should create a new user', (done: any) => {
        chai.request(app)
            .post('/user')
            .send({
                'email': 'test@gmail.com',
                'username': 'deleteTest',
                'password': 'tester123'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    })

    it('should delete the created user', (done: any) => {
        chai.request(app)
            .delete('/user/deleteTest')
            .send({
                'password': 'tester123'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
});

describe('updateUser test', () => {
    it('should create a new user', (done: any) => {
        chai.request(app)
            .post('/user')
            .send({
                'email': 'test@gmail.com',
                'username': 'Update',
                'password': 'yeet'
            })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    })

    it('should update the created user', (done: any) => {
        chai.request(app)
            .put('/user/Update')
            .send({
                'oldPassword': 'yeet',
                'newPassword': 'newpassword123'
            })
            .end(function(err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
        })
    })

    it('should delete the created user', (done: any) => {
        chai.request(app)
            .delete('/user/Update')
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
