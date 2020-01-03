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