'use strict';

const request = require('supertest');
const assert = require('chai').assert;

const app =  require('../src/app');

describe('API tests', () => {
    describe('GET /health', () => {
        it('Endpoint should be available', (done) => {
            request(app)
                .get('/health')
                .set('Content-Type', 'application/json')
                .expect(200, done);
        });
    });
});

describe('GET /vehicles/available', () => {
    it('should return error', (done) => {
        request(app)
            .get('/vehicles/available-d')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
    });

    it('should return', (done) => {
        request(app)
            .get('/vehicles/available')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.exists('total_records', JSON.stringify(res.body));
                assert.isAtLeast(Object.keys(res.body).length, 0);
            })
            .end(done);
    });
});

describe('GET /vehicles/not-availale', () => {
    it('should return error', (done) => {
        request(app)
            .get('/vehicles/not-availale')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
    });

    it('should return result', (done) => {
        request(app)
            .get('/vehicles/not-available')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.exists('total_records', JSON.stringify(res.body));
                assert.isAtLeast(Object.keys(res.body).length, 0);
            })
            .end(done);
    });
});

describe('GET /type/:type', () => {
    it('should return error', (done) => {
        request(app)
            .get('/vehicles/types/abc')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
    });

    it('should return empty result', (done) => {
        request(app)
            .get('/vehicles/type/abc')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"total_records":0,"bikes":{}}');
            })
            .end(done);
    });

    it('should return bike for given type', (done) => {
        request(app)
            .get('/vehicles/type/ebicycle_paris')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.exists('total_records', JSON.stringify(res.body));
                assert.isAtLeast(Object.keys(res.body).length, 0);
            })
            .end(done);
    });
});

describe('GET /pricinig/:plan', () => {
    it('should return error', (done) => {
        request(app)
            .get('/vehicles/pricing/')
            .set('Content-Type', 'application/json')
            .expect(404)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{}');
            })
            .end(done);
    });

    it('should return empty result', (done) => {
        request(app)
            .get('/vehicles/pricing/wrong-pricing-plan')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.equal(JSON.stringify(res.body), '{"total_records":0,"bikes":{}}');
            })
            .end(done);
    });

    it('should return bikes with given pricing plan', (done) => {
        request(app)
            .get('/vehicles/pricing/bike-standard-pricing-paris')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                assert.exists('total_records', JSON.stringify(res.body));
                assert.isAtLeast(Object.keys(res.body).length, 0);
            })
            .end(done);
    });
});