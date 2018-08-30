import CreatorSpecificEvent from './CreatorSpecificEvent/CreatorSpecificEvent';


const testRead = require('');
const request = require('supertest');


const newItem = {
    name: 'soda'
}

const url = 'http://localhost:4000/api/post_requestedItem';

describe('Car tests', () => {
    test('test post', () => {
        expect.assertions(2);
        return promises.addItem(url, newItem).then( response => {
            expect(response[0]).not.toBeUndefined();
            expect(response[0]).toEqual({
                id: 1,
                name: 'soda'
            })
        })
    })
})