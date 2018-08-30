const testRead = require('');
const request = require('supertest')

const app = require('../index')

const { readUser } = require('./controller');



describe('user check', () => {
test('check readUser response', function(){
    request(app).get('/api/user-data').then((response) => {
        expect(response.statusCode).toEqual(200)
    })
})
})






    









