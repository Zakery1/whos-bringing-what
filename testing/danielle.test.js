const removeEvent = require('./functions/removeEvent');
const createEvent = require('./functions/createEvent');

describe('test if event is removed', () => {
    let original = removeEvent.events.length;
    it('returns new event length', () =>{
        let newArray = removeEvent.removeEvent('super fun times');
        expect(newArray.length < original).toBe(true);
    })
}),

describe('test if object was added',() => {
    let newEvent = createEvent.events;
    it ('checks if event was added', () => {
         createEvent.addEvent();
        console.log(createEvent.events)
        expect(newEvent[newEvent.length - 1].name).toBe('dance party')
    })
})