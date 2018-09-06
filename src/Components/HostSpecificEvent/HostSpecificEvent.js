import React, { Component } from 'react';
import axios from 'axios';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import Sugar from 'sugar';
Sugar.Date.extend()

export default class HostSpecificEvent extends Component {
    state={
        event: [],
        requestedItems: [],
        willBringItems: [],
        loading: false,
        users: []
    }
    componentDidMount() {

        this.setState({
            loading: true
        })
        const eventId = this.props.match.params.id

        function fetchEvent() {
            return axios.get(`/api/event/${eventId}`);
        }
        
        function fetchRequestedItems() {
            return axios.get(`/api/requested_items/${eventId}`);
        }

        function fetchUsers() {
            return axios.get(`/api/users_invited_event/${eventId}`)
        }

        axios.all([fetchEvent(), fetchRequestedItems(), fetchUsers()])
        .then(axios.spread((event,requestedItems, users)=>{
            this.setState({
                event: event.data,
                requestedItems: requestedItems.data,
                loading: false,
                users: users.data
            })
        })).catch(error => {
            console.log('Axios error ALL on SpecificEvent', error)
        })
    }

 

   

    render() {

        const { users, event, requestedItems, loading } = this.state
        const displayRequestedItems = requestedItems.map((item,i) => {
            const index = users.findIndex(e => e.id === item.user_id)
            return(
                <div key={i}>
                    <h2 style={item.spokenfor ? { textDecoration: 'line-through'} : { textDecoration: 'none'} } >{item.name}</h2>
                    <p>Assigned to: {users[index].username}</p>
                </div>
            )
        })
       

        return (
            <div className="specific_event_parent">
            {event.length 
            ? 
            <div>
                <h1> Name: {event[0].event_name} *You are hosting*</h1>
                <div className='specific_event_map'><EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} /></div>
                <img className='specific_event_event_photo' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <p>Description: {event[0].description ? event[0].description : 'No description written'}</p>
                <p>Start Time: {new Date().long(event[0].start_time)}</p>
                <p>Place: {event[0].place ? event[0].place : 'No place given'}</p>
                <p>Street: {event[0].street ? event[0].street : 'No street given'}</p>
                <p>City: {event[0].city ? event[0].city : 'No city given'}</p>
                <p>State: {event[0].state ? event[0].state : 'No state given'}</p>
                <p>Zip: {event[0].zip ? event[0].zip : 'No zipcode given'}</p>
                <p>Country: {event[0].country ? event[0].country : 'No country given'}</p>
            </div>
            :
            <p>Loading Event...</p>
            }
            
            <div className="requested_items">
                <div className="needed_items">
                    <h1>Items</h1> 
                    {loading ? 'Loading Items...' : displayRequestedItems}
                </div>
            

            </div>
            </div>
        );
    }
} 