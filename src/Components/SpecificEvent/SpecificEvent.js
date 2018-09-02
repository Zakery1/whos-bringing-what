import React, { Component } from 'react';
import axios from 'axios';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import Sugar from 'sugar';
Sugar.Date.extend()

export default class SpecificEvent extends Component {
    state={
        event: [],
        requestedItems: [],
        willBringItems: [],
        loading: false,
        username: '',
        userId: ''
    }
    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            this.setState({
              username: response.data.username,
              userId: response.data.id
            })
            this.props.updateUser(response.data)
          }).catch(error => {
            console.log('Axios error GET with componentDidMount on Nav.js', error)
          })

        const eventId = this.props.match.params.id

        this.setState({
            loading: true
        })

        function fetchEvent() {
            return axios.get(`/api/event/${eventId}`);
        }
        
        function fetchRequestedItems() {
            return axios.get(`/api/requestedItems/${eventId}`);
        }



        axios.all([fetchEvent(), fetchRequestedItems()])
        .then(axios.spread((event,requestedItems)=>{
            console.log('event', event.data)
            console.log('requestedItems', requestedItems.data)
            this.setState({
                event: event.data,
                requestedItems: requestedItems.data,
                loading: false
            })
        })).catch(error => {
            console.log('Axios error ALL on SpecificEvent', error)
        })
    }

    spokenFor = (id) => {
        const { userId } = this.state 
        const eventId = this.props.match.params.id
        axios.patch(`/api/patch_spokenForItem/${eventId}/${userId}/${id}`)
        .then( response => {
            this.setState({
                requestedItems: response.data
            })
        })
    }

    unassignItem = (id) => {
        const eventId = this.props.match.params.id
        axios.patch(`/api/patch_assignedItem/${eventId}/${id}`)
        .then( response => {
            this.setState({
                requestedItems: response.data
            })
        })
    }

    render() {

        const { username, event, requestedItems, loading } = this.state
        const displayRequestedItems = requestedItems.map((item,i) => {
            return(
                <div style={item.spokenfor ? { textDecoration: 'line-through'} : { textDecoration: 'none'} } key={i}>
             
                    <p>{item.name}</p>
                    <p>{item.user_id}</p>
                    <button onClick={() => this.spokenFor(item.id)} disabled={item.spokenfor}>Click to bring</button>
                </div>
            )
        })

        const willBringItems = requestedItems.filter(item => item.user_id === this.state.userId )

        const displayWillBringItems = willBringItems.map((item,i) => {
            return(
                <div key={i}>
                    <p>{item.name}</p>
                    <p>{item.user_id}</p>
                    <button onClick={() => this.unassignItem(item.id)}>Unassign item</button>
                </div>
            )
        })

        return (
            <div className="Specific_event_parent">
            Event
            {event.length 
            ? 
            <div>
                <h1> Name: {event[0].event_name}</h1>
                <EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} />
                <img className='SpecificEvent_eventPhoto' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <p>Start Time: {new Date().long(event[0].start_time)}</p>
                <p>Description: {event[0].description}</p>
                <p>Place: {event[0].place}</p>
                <p>City: {event[0].city}</p>
                <p>State: {event[0].state}</p>
                <p>Zip: {event[0].zip}</p>
                <p>Country: {event[0].country}</p>
            </div>
            :
            <p>Loading Event...</p>
            }
            
            <div className="Requested_items">
                <div className="Needed_items">
                    Items 
                    {loading ? 'Loading Items...' : displayRequestedItems}
                </div>
                <div className="Will_bring">
                    {username} is bringing

                    {loading ? 'Loading my Items' : displayWillBringItems}
                </div>
            

            </div>
            </div>
        );
    }
} 