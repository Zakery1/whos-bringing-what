const { updateItem }  = require('./functions/updateitem')
const { postItem } = require('./functions/postitem');


const url = 'http://localhost:4000' 

// ---- Create 

// Test if function exists 
test('postItem should exist', () => {
    expect(postItem).toBeDefined()
})

// Async Await
test('Post item should return Chicken', async () => {
    expect.assertions(1);
   const response = await postItem(`${url}/api/post_requestedItem/1`)
        expect(response[0].name).toEqual('Chicken')
})

// ---- Update 

// Test if function exists
test('updateItem should exist', () => {
        expect(updateItem).toBeDefined()
})

// Promise
test('Update item should return Chicken', () => {
    expect.assertions(1);
    return updateItem(`${url}/api/patch_requestedItem/3/1`).then(data => {
        expect(data[data.length - 1].name).toEqual('Chicken')
    })
})


