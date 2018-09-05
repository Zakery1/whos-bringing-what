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
                return axios.get(`/api/event/${parent.event_id}`).then(res => res.data)
            } 
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return axios.get(`/api/user-info/${parent.user_id}`).then(res => res.data)
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
        profilePicture: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        requesteditems: {
            type: new GraphQLList(RequestedItemType),
            args: {
                eventId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, { eventId }) {
                return axios.get(`/api/requested_items/${eventId}`).then(res => res.data)
            }
        },
        event: {
            type: EventType, 
            args: { 
               eventId: { type: new GraphQLNonNull(GraphQLString) } 
            },
            resolve(parent, { eventId }) {
                return axios.get(`/api/event/${eventId}`).then(res => res.data)
            }
        }
    } 
})

// const Mutations = new GraphQLObjectType({
//     name: 'Mutations'
// })


module.exports = new GraphQLSchema({
    query: RootQuery, 
    // mutation: Mutations
})
