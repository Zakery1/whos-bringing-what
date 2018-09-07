import React, { Component } from 'react';
import axios from 'axios';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import {user_circle} from 'react-icons-kit/ikons/user_circle';
import { Icon } from 'react-icons-kit';
import {tick} from 'react-icons-kit/ikons/tick'
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
                  <p className="individual_bring_item">  {item.spokenfor ? <img className="icon_profile_photo" src={users[index].profile_pic} alt="Displaying user bringing item"/> : ''} <br/> {users[index].username} is bringing {item.name} </p>

                </div>
            )
        })
       

        return (
            <div className="specific_event_parent">
            {event.length 
            ? 
            <div className="host_event info">
                <h1 className="host_event_name"> Name: {event[0].event_name} <br/> *You are hosting*</h1>
                {/* <EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} /> */}
                <img className='specific_event_event_photo' src={event[0].cover_photo} alt="Displaying event portrait"/>
              <div className="host_event_info">
                <p>Description: {event[0].description ? event[0].description : 'No description written'}</p>
                <p>Start Time: {new Date().long(event[0].start_time)}</p>
                <p>Place: {event[0].place ? event[0].place : 'No place given'}</p>
                <p>Street: {event[0].street ? event[0].street : 'No street given'}</p>
                <p>City: {event[0].city ? event[0].city : 'No city given'}</p>
                <p>State: {event[0].state ? event[0].state : 'No state given'}</p>
                <p>Zip: {event[0].zip ? event[0].zip : 'No zipcode given'}</p>
                <p>Country: {event[0].country ? event[0].country : 'No country given'}</p>
              </div>  
            </div>
            :
            <p>Loading Event...</p>
            }
            
                <div className="needed_items">
                  <h1 className="my_items_title">My Item Requests</h1> 
                  <div className="requested_items_list"> {loading ? 'Loading Items...' : displayRequestedItems} </div> 
                </div>

            </div>
        );
    }
} 