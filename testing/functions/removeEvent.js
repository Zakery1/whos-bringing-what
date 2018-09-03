module.exports={
    events:[
        {
            id: 1,
            name: 'augment bbq',
            state: 'arizona',
            description: 'schools out!'
        },
        {
            id:2,
            name: 'super fun times',
            state: 'arizona',
            description: 'augment bbq',
        },
        {
            id:3,
            name: 'colorado trip',
            state: 'colorado',
            description: 'canoeing the colorado river',
        }
    ],

    removeEvent(name){
        let indextoRemove = this.events.findIndex(event => event.name === name)
        this.events.splice(indextoRemove, 1);
        return this.events;
    }
}