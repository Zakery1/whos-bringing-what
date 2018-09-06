const axios = require('axios')
require("dotenv").config();
const get = require('lodash/get');
const SS_KEY = process.env.SMART_STREETS_API
const isEqual = require('lodash/isEqual')

module.exports = {
    login: (req, res) => {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `https://${req.headers.host}/auth/callback`
        };
        const dbInstance = req.app.get('db');
        function tradeCodeForAccessToken() {
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        }
        function tradeAccessTokenForUserInfo(response) {
            const accessToken = response.data.access_token
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`)
        }
        function fetchAuth0AccessToken(userInfoResponse){
            req.session.user = userInfoResponse.data;
            const payload = {
                grant_type: 'client_credentials',
                client_id: process.env.NODE_APP_CLIENT_ID,
                client_secret: process.env.NODE_APP_CLIENT_SECRET,
                audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`
              }
              return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
        }
        function fetchFacebookAccessToken(auth0AccessTokenResponse){
            const options = {
              headers: {
                authorization: `Bearer ${auth0AccessTokenResponse.data.access_token}`
              }
            }
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${req.session.user.sub}`, options)
          }
        function storeUserInfoInDataBase(facebookAccessTokenResponse){
                const auth0Id = facebookAccessTokenResponse.data.identities[0].user_id
                // Checking to see if user is in our Database
                dbInstance.read_user_by_auth0_id({auth0Id}).then(users => {
                    if (users.length) {
                        const user = {
                            id: users[0].id,
                            username: users[0].username,
                            email: users[0].email,
                            profile_pic: users[0].profile_pic
                        } 
                        req.session.user = user;
                        res.redirect('/feed');
                    // If user is not in database then create user and store in Database
                    } else {
                        const createUserData = {
                            auth0Id,
                            email: facebookAccessTokenResponse.data.email,
                            username: facebookAccessTokenResponse.data.name,
                            profilePicture: facebookAccessTokenResponse.data.picture_large
                        }
                dbInstance.create_user(createUserData).then(newUsers => {
                        const user = {
                            id: newUsers[0].id,
                            username: newUsers[0].username,
                            email: newUsers[0].email,
                            profile_pic: newUsers[0].profile_pic
                        } 
                        req.session.user = user;
                        res.redirect('/feed');
                    })
                    }
                })
                return facebookAccessTokenResponse;
        }

        function storeEventsInDatabase(facebookAccessTokenResponse){
            let auth0Id = req.session.user.sub.split('|')[1]

              // Get all events that are in the Database
            dbInstance.read_events().then(databaseEvents => {
             // Request to get all events that user is linked to (attending, interested, created)
            axios.get(`https://graph.facebook.com/me?fields=events{id,name,cover,description,place,rsvp_status,start_time,admins}&access_token=${facebookAccessTokenResponse.data.identities[0].access_token}`)
            .then(facebookEvents => {
                // console.log('facebook events------------++++++++',facebookEvents.data.events.data)
                // console.log("location ---------------", facebookEvents.data.events.data.place)

             // Checking through each event that Facebook gave back
             facebookEvents.data.events.data.forEach(facebookEvent => {
                    // console.log('facebook event place <<<<<<<<<<<<', facebookEvent.place)
                    

                    //Smart Streets
                 
                    get(facebookEvent, 'place.name', null) && !get(facebookEvent, 'place.location', null) && get(facebookEvent, 'place.name', null).includes('United States')           
                 ? axios.get(`https://us-street.api.smartystreets.com/street-address?street=${facebookEvent.place.name}&address-type=us-street-freeform&auth-id=${process.env.SMART_STREETS_AUTH_ID}&auth-token=${SS_KEY}`)
                 .then((res) => {
                    //  console.log("res.data-------------", res.data, 'facebookEvent@@@@@@@@', facebookEvent)  
                     facebookEvent.place.location = {
                        city: res.data[0].components.city_name,
                        country: "United States",
                        latitude: res.data[0].metadata.latitude,
                        longitude: res.data[0].metadata.longitude,
                        state: res.data[0].components.state_abbreviation,
                        street: res.data[0].delivery_line_1,
                        zip: res.data[0].components.zipcode,
                     };
                     console.log('whole facebook event', facebookEvent)
                    console.log('databaseEvents --------', databaseEvents )


        
                    // Check events in the Database with the id of the new events coming in, if new events are not in database then keep going
                  if(databaseEvents.findIndex(event => event.event_id === facebookEvent.id) === -1) {
                        // Check to see if user is going, if user is unsure/interested, event will not be displayed
                        if(facebookEvent.rsvp_status === "attending") {
                            let eventObj = { 
                                eventId: get(facebookEvent, 'id', null),
                                eventName: get(facebookEvent, 'name', null),
                                eventPhoto: get(facebookEvent, 'cover.source', null),
                                description: get(facebookEvent, 'description', null), 
                                place: get(facebookEvent, 'place.name', null),
                                city: get(facebookEvent, 'place.location.city', null),
                                country: get(facebookEvent, 'place.location.country', null),
                                latitude: get(facebookEvent,'place.location.latitude',null),
                                longitude: get(facebookEvent,'place.location.longitude',null),
                                state: get(facebookEvent,'place.location.state',null),
                                street: get(facebookEvent,'place.location.street',null),
                                zip: get(facebookEvent,'place.location.zip',null),
                                startTime: get(facebookEvent,'start_time',null),
                                creatorId: get(facebookEvent,'admins.data[0].id',null)
                            }
                            // Store created event in Database
                            dbInstance.create_event(eventObj).then(events => {
                                dbInstance.read_user_by_auth0_id({auth0Id}).then(users => {
                                        dbInstance.create_invitation({eventId: events[0].id, userId: users[0].id})
                                })
                            })
                        }
                    // If the facebook event is already in the database 
                    } else if (databaseEvents.findIndex(event => event.event_id === facebookEvent.id) !== -1) {
                        console.log('hit------------------')
                        // Get the index where the event from the database, matches the event that is currently being checked on
                        const index = databaseEvents.findIndex(event => event.event_id === facebookEvent.id)
                        dbInstance.read_user_by_auth0_id({auth0Id}).then(users => {
                            const userId = users[0].id
                                dbInstance.read_invitations({userId}).then(invitations => {
                                    // If they have not been invited yet, linked the event and user through the invitations table
                                    if(invitations.findIndex(invitation => invitation.event_id === databaseEvents[index].id && invitation.user_id === users[0].id) === -1) 
                                    {dbInstance.create_invitation({eventId: databaseEvents[index].id, userId})}
                                    
                                })  
                                
                        })
                        
                    } 
                }) 
                    
                : ''
                // Check events in the Database with the id of the new events coming in, if new events are not in database then keep going
                if (databaseEvents.findIndex(event => event.event_id === facebookEvent.id) === -1) {
                    // Check to see if user is going, if user is unsure/interested, event will not be displayed
                    if(facebookEvent.rsvp_status === "attending") {
                        let eventObj = { 
                            eventId: get(facebookEvent, 'id', null),
                            eventName: get(facebookEvent, 'name', null),
                            eventPhoto: get(facebookEvent, 'cover.source', null),
                            description: get(facebookEvent, 'description', null), 
                            place: get(facebookEvent, 'place.name', null),
                            city: get(facebookEvent, 'place.location.city', null),
                            country: get(facebookEvent, 'place.location.country', null),
                            latitude: get(facebookEvent,'place.location.latitude',null),
                            longitude: get(facebookEvent,'place.location.longitude',null),
                            state: get(facebookEvent,'place.location.state',null),
                            street: get(facebookEvent,'place.location.street',null),
                            zip: get(facebookEvent,'place.location.zip',null),
                            startTime: get(facebookEvent,'start_time',null),
                            creatorId: get(facebookEvent,'admins.data[0].id',null)
                        }
                        // Store created event in Database
                        dbInstance.create_event(eventObj).then(events => {
                            dbInstance.read_user_by_auth0_id({auth0Id}).then(users => {
                                    dbInstance.create_invitation({eventId: events[0].id, userId: users[0].id})
                            })
                        })
                    }
                // If the facebook event is already in the database 
                } else if (databaseEvents.findIndex(event => event.event_id === facebookEvent.id) != -1) { 
                    // Get the index where the event from the database, matches the event that is currently being checked on
                    const index = databaseEvents.findIndex(event => event.event_id === facebookEvent.id)
                    dbInstance.read_user_by_auth0_id({auth0Id}).then(users => {
                        const userId = users[0].id
                            dbInstance.read_invitations({userId}).then(invitations => {
                                // If they have not been invited yet, linked the event and user through the invitations table
                                if(invitations.findIndex(invitation => invitation.event_id === databaseEvents[index].id && invitation.user_id === users[0].id) === -1) 
                                {dbInstance.create_invitation({eventId: databaseEvents[index].id, userId})}
                                
                            })  
                    })
                } 
                    })
                })
            })
            return facebookAccessTokenResponse;
        }
        function checkDatabaseEventsForUnattend(facebookAccessTokenResponse) {
            let auth0Id = req.session.user.sub.split('|')[1]
                dbInstance.read_events_link_to_user({auth0Id: auth0Id.toString()}).then(databaseEvents => {
                    axios.get(`https://graph.facebook.com/me?fields=events{id,name,cover,description,place,rsvp_status,start_time,admins}&access_token=${facebookAccessTokenResponse.data.identities[0].access_token}`)
                    .then(facebookEvents => {
                    // Check to see if events in database that user is linked to are events that the user is still going to
                    databaseEvents.forEach(databaseEvent => {
                        const eventId = databaseEvent.id
                         // Check event id in the Database with the id of the facebook events coming in, if the user is no longer attending the event(on Facebook) then clear the event accordingly
                    if(facebookEvents.data.events.data.findIndex(event => event.id === databaseEvent.event_id) === -1) {
                        if(databaseEvent.creator_id === auth0Id.toString()){
                            // Delete all invitations that event is connected to
                            dbInstance.delete_all_invitations({eventId})
                            // Delete all requestedItems that event is connected to
                            dbInstance.delete_all_items({eventId})
                            // Delete event that creator was hosting
                            dbInstance.delete_event({eventId})
                        // Check event to see if current user is creator of event
                        } else if(databaseEvent.creator_id != auth0Id.toString()) {
                            dbInstance.read_user_by_auth0_id({auth0Id}).then(users => { 
                                const userId = users[0].id
                            // Update requesteditems table so that items current user assigned themselves to will be reassigned to creator
                            dbInstance.update_items_to_creator({eventId, userId})
                            // If user is only person going to event, then delete event
                            dbInstance.count_invitations({eventId}).then(counts => {
                               if(counts[0].count < 2) {
                                   dbInstance.delete_event({eventId})
                               }
                            })
                            // Delete invitation that connects user to event 
                            dbInstance.delete_invitation({eventId, userId})
                        })}
                        // If facebook event has new information that is different from database event
                     } else if (facebookEvents.data.events.data.findIndex(event => event.id === databaseEvent.event_id) !== -1 ) {
                         const index = facebookEvents.data.events.data.findIndex(event => event.id === databaseEvent.event_id)
                         const facebookEvent = facebookEvents.data.events.data[index]
                                          
                            get(facebookEvent, 'place.name', null) && !get(facebookEvent, 'place.location', null) && get(facebookEvent, 'place.name', null).includes('United States')           
                            ? axios.get(`https://us-street.api.smartystreets.com/street-address?street=${facebookEvent.place.name}&address-type=us-street-freeform&auth-id=${process.env.SMART_STREETS_AUTH_ID}&auth-token=${SS_KEY}`)
                            .then((res) => {
                    //  console.log("res.data-------------", res.data, 'facebookEvent@@@@@@@@', facebookEvent)  
                     facebookEvent.place.location = {
                        city: res.data[0].components.city_name,
                        country: "United States",
                        latitude: res.data[0].metadata.latitude,
                        longitude: res.data[0].metadata.longitude,
                        state: res.data[0].components.state_abbreviation,
                        street: res.data[0].delivery_line_1,
                        zip: res.data[0].components.zipcode,
                     };
                    //  console.log('whole facebook event', facebookEvent)

                         let facebookObj = { 
                            event_id: get(facebookEvent, 'id', null),
                            event_name: get(facebookEvent, 'name', null),
                            cover_photo: get(facebookEvent, 'cover.source', null),
                            description: get(facebookEvent, 'description', null), 
                            place: get(facebookEvent, 'place.name', null),
                            city: get(facebookEvent, 'place.location.city', null),
                            country: get(facebookEvent, 'place.location.country', null),
                            latitude: get(facebookEvent,'place.location.latitude',null),
                            longitude: get(facebookEvent,'place.location.longitude',null),
                            state: get(facebookEvent,'place.location.state',null),
                            street: get(facebookEvent,'place.location.street',null),
                            zip: get(facebookEvent,'place.location.zip',null),
                            start_time: get(facebookEvent,'start_time',null),
                            creator_id: get(facebookEvent,'admins.data[0].id',null)
                        }
                        delete databaseEvent.id
                        databaseEvent.latitude === null ? '' : databaseEvent.latitude = +databaseEvent.latitude 
                        databaseEvent.longitude === null ? '' : databaseEvent.longitude  = +databaseEvent.longitude
                        // console.log('facebookObj***************', facebookObj)
                        // console.log('dbevent$$$$$', databaseEvent)
                        if (!isEqual(facebookObj, databaseEvent)){
                            // console.log("it got hit!!!!!!!!!!!!!!!!!")
                            dbInstance.update_event(facebookObj)
                        }
                    }) 
                    
                    :''
                    let facebookObj = { 
                        event_id: get(facebookEvent, 'id', null),
                        event_name: get(facebookEvent, 'name', null),
                        cover_photo: get(facebookEvent, 'cover.source', null),
                        description: get(facebookEvent, 'description', null), 
                        place: get(facebookEvent, 'place.name', null),
                        city: get(facebookEvent, 'place.location.city', null),
                        country: get(facebookEvent, 'place.location.country', null),
                        latitude: get(facebookEvent,'place.location.latitude',null),
                        longitude: get(facebookEvent,'place.location.longitude',null),
                        state: get(facebookEvent,'place.location.state',null),
                        street: get(facebookEvent,'place.location.street',null),
                        zip: get(facebookEvent,'place.location.zip',null),
                        start_time: get(facebookEvent,'start_time',null),
                        creator_id: get(facebookEvent,'admins.data[0].id',null)
                    }
                    delete databaseEvent.id
                    databaseEvent.latitude === null ? '' : databaseEvent.latitude = +databaseEvent.latitude 
                    databaseEvent.longitude === null ? '' : databaseEvent.longitude  = +databaseEvent.longitude
                    // console.log('facebookObj***************', facebookObj)
                    // console.log('dbevent$$$$$', databaseEvent)
                    if (!isEqual(facebookObj, databaseEvent)){
                        // console.log("it got hit!!!!!!!!!!!!!!!!!")
                        dbInstance.update_event(facebookObj)
                    }
                    
                     }
                    })
                    })
                    
                })
                
            }
        tradeCodeForAccessToken()
        .then(tradeAccessTokenForUserInfo)
        .then(fetchAuth0AccessToken)
        .then(fetchFacebookAccessToken)
        .then(storeUserInfoInDataBase)
        .then(storeEventsInDatabase)
        .then(checkDatabaseEventsForUnattend)
        .catch(error => {
            console.log('---- error with login', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).redirect('/');
    },
    createRequestedItem: (req, res) => {
        const dbInstance = req.app.get('db')
        const { eventId, userId } = req.params 
        const { name } = req.body
        dbInstance.create_item({
            name,
            eventId,
            userId,
            spokenfor: false
        })
        .then(items => {
            res.status(200).json(items)
        }).catch(error => {
            console.log('---- error with createRequestedItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    deleteRequestedItem: (req, res) => {
        const dbInstance = req.app.get('db')
        const { itemId } = req.params
        dbInstance.delete_item({itemId})
        .then(items => {
                res.status(200).json(items)
        }).catch(error => {
            console.log('---- error with deleteRequestedItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    updateRequestedItem: (req, res) => {
        const dbInstance = req.app.get('db')
        const { name } = req.body
        const { itemId } = req.params
        dbInstance.update_item({name, itemId})
        .then(items => {
                res.status(200).json(items)
        }).catch(error => {
            console.log('---- error with updateRequestedItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    updateSpokenForItem: ( req, res ) => {
        const dbInstance = req.app.get('db')
        const { itemId, userId, eventId } = req.params
        dbInstance.update_spoken_for({userId, itemId})
        .then(() => {
            dbInstance.read_items({eventId})
            .then(items => {
                res.status(200).json(items)
            })
        }).catch(error => {
            console.log('---- error with updateSpokenFor', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    },
    unassignItem: ( req, res ) => {
        const dbInstance = req.app.get('db')
        const {eventId, itemId} = req.params
        dbInstance.unassign_item({eventId, itemId})
        .then(() => {
            dbInstance.read_items({eventId})
            .then(items => {
                res.status(200).json(items)
            })
        }).catch(error => {
            console.log('---- error with unasignItem', error)
            res.status(500).json({message: 'Server error. See server terminal'})
        })
    }
}


