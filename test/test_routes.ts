// @ts-ignore
const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chaiHttp = require('chai-http');
const app = require('../src/app').testable;
const expect = require('chai').expect;
const assert = require('chai').assert;

chai.use(chaiHttp);

describe('getUser test', () => {
    it('should return user Guus', (done: any) => {
        chai.request(app)
            .get('/Guus/')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });
})





