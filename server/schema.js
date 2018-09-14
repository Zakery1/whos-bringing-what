const graphql = require("graphql");
const axios = require("axios");

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLBoolean,
    GraphQLInt, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLList, 
    GraphQLNonNull 
} = graphql;

const RequestedItemType = new GraphQLObjectType({
    name: 'RequestedItem',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) }, 
        event: { 
            type: EventType,
            resolve(parent, args) {
                return axios.get(`${window.location.origin}/api/event/${parent.event_id}`)
                .then(res =>  res.data[0])
            } 
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return axios.get(`${window.location.origin}/api/user-info/${parent.user_id}`)
                .then(res => res.data[0])
            }
        }, 
        spokenfor: { type: GraphQLBoolean }

    })
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        event_id: { type: GraphQLString },
        event_name: { type: GraphQLString },
        cover_photo: { type: GraphQLString },
        description: { type: GraphQLString },
        place: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        state: { type: GraphQLString },
        street: { type: GraphQLString },
        zip: { type: GraphQLString },
        start_time: { type: GraphQLString },
        creator_id: { type: GraphQLString }
    })
})


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        profile_pic: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        requesteditems: {
            type: new GraphQLList(RequestedItemType),
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, { eventId }) {
                return axios.get(`https://whosbringingwhat.org/api/requested_items/${eventId}`).then(res => res.data)
            }
        },
        event: {
            type: EventType, 
            args: { 
               eventId: { type: new GraphQLNonNull(GraphQLID) } 
            },
            resolve(parent, { eventId }) {
                return axios.get(`https://whosbringingwhat.org/api/event/${eventId}`).then(res => res.data[0])
            }
        }, 
        user: {
            type: UserType, 
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) } 
            }, 
            resolve(parent, { eventId }) {
                return axios.get(`https://whosbringingwhat.org/api/user-event/${eventId}`).then(res => res.data[0])
            }
        }
    } 
})

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addItem: {
            type: RequestedItemType,
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLID) },
                userId: { type: new GraphQLNonNull(GraphQLID) }, 
                name: { type: GraphQLString }
            },
            resolve(parent, { eventId, userId, name }) {
                return axios.post(`https://whosbringingwhat.org/api/post_requested_item/${eventId}/${userId}`, { name })
                .then(res => res.data[0])
            }
        }, 
        deleteItem: {
            type: RequestedItemType,
            args: {
                itemId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, { itemId }) {
                return axios.delete(`https://whosbringingwhat.org/api/delete_requested_item/${itemId}`)
                .then(res => res.data[0])
            },
        },
        updateItem: {
            type: RequestedItemType, 
            args: {
                itemId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString }
            },
            resolve(parent, { itemId, name }) {
                return axios.patch(`https://whosbringingwhat.org/api/patch_requested_item/${itemId}`, { name })
                .then(res => res.data[0])
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery, 
    mutation: Mutations 
})
