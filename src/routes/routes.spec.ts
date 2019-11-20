const chaiTester = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app').app;
const expect = chaiTester.expect;

chaiTester.use(chaiHttp);


describe('getUser test', () => {

    it('should return user Guus', (done: any) => {
        chaiTester.request(app)
            .get('/Guus/')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    });
})





