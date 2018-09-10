const { user, requestedItems, findMyItems }  = require('./functions/displaybringing');


//check if findMyItems function exists
test('items i am bringing', () => {
    expect(findMyItems).toBeDefined()
});

//check user is in object
test('check user', () => {
    expect(user).toHaveLength(1)
});

// check status of requestedItems
test('check requested user', () => {
    expect(requestedItems).toBeTruthy()
});

//check user object
test('check user id', () => {
    expect(user[0].id).toBe(3)
})

//check for correct username
test('check user', () => {
    const name = "Zak Graham"
    expect(user[0].username).toBe(name)
});




