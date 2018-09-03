const testRead = require('');
const request = require('supertest')

const app = require('../server/index');

const { readUser } = require('../server/index');

const { readCreatedEvents } = require('../server/index');


describe('user check', () => {
    test('check readUser response', function(){
        request(app).get('/api/user-data').then((response) => {
            expect(response.statusCode).toBe(200)
        })
    })
})











