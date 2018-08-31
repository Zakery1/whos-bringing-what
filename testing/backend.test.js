const testRead = require('');
const request = require('supertest')

const app = require('../server/index');

const { readUser } = require('../server/index');

const { readCreatedEvents } = require('../server/index');


describe('user check', () => {
    test('check readUser response', function(){
        request(app).get('/api/user-data').then((response) => {
            expect(response.statusCode).toEqual(200)
        })
    })
})

describe('event check ', () => {
    test('check event', function(){
        request(app).get('/api/createdEvents').then((response) => {
            expect(response.statusCode).not.toBeUndefined()
        });
    })
}) 



    









