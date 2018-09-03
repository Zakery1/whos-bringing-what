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
    addEvent(){
        this.events.push({
            id:4,
            name:'dance party',
            state: 'texas',
            description: 'come dance with us!'
        })
    }
}