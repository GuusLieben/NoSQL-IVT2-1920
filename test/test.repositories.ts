// @ts-ignore
import {setProduction} from "../src/app";
import { RepositoryMongodb } from '../src/services/repository.mongodb';
import { RepositoryNeo4j } from "../src/services/repository.neo4j";

const chai = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const chaiHttp = require('chai-http');
const app = require('../src/app').testable;
const expect = require('chai').expect;
const before = mocha.before;
const mongo = new RepositoryMongodb();
const neo4j = new RepositoryNeo4j();

chai.use(chaiHttp);

before((done: any) => {
    setProduction(false);
    setTimeout(() => done(), 2500);
});

describe('Neo4j repository', () => {
    it('should create two friends in the database without throwing error', (done: any) => {
        neo4j.createFriends('Peter', 'Alexander').then(result => {
            expect(result).to.have.property('err');
            expect(result.error).to.equal(undefined);
            done();
        })
    })
});

describe('Neo4j repository', () => {
    it('should create two friends in the database with positive result', (done: any) => {
        neo4j.createFriends('Berend', 'Maurits').then(result => {
            expect(result).to.have.property('res');
            expect(result.result).to.equal(true);
            done();
        })
    })
});

describe('Neo4j repository', () => {
    it('should return all friends in the database without throwing error', (done: any) => {
        neo4j.getFriends('Alexander').then(result => {
            expect(result).to.have.property('err');
            expect(result.error).to.equal(undefined);
            done();
        })
    })
});

describe('Neo4j repository', () => {
    it('should return all friends in the database with positive result', (done: any) => {
        neo4j.getFriends('Berend').then(result => {
            expect(result).to.have.property('res');
            expect(result.result).to.be.a('Array');
            done();
        })
    })
});

describe('Neo4j repository', () => {
    it('should delete two friends in the database without throwing error', (done: any) => {
        neo4j.deleteFriends('Peter', 'Alexander').then(result => {
            expect(result).to.have.property('err');
            expect(result.error).to.equal(undefined);
            done();
        })
    })
});

describe('Neo4j repository', () => {
    it('should delete two friends in the database with positive result', (done: any) => {
        neo4j.deleteFriends('Berend', 'Maurits').then(result => {
            expect(result).to.have.property('res');
            expect(result.result).to.equal(true);
            done();
        })
    })
});