import React, { Component } from 'react';
import axios from 'axios';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import Sugar from 'sugar';
Sugar.Date.extend()

// import EventMap from '../GoogleMaps/EventMap';
// const API_KEY = 'AIzaSyC7lvoQRtO4bDubVUmRQoMNl7wjQuZm-IU';

export default class SpecificEvent extends Component {
    state={
        event: [],
        requestedItems: [],
        loading: false
    }
    componentDidMount() {
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
    render() {
        const { event, requestedItems, loading } = this.state
        const displayRequestedItems = requestedItems.map((item,i) => {
            return(
                <div key={i}>
                    <p>{item.name}</p>
                </div>
            )
        })
        return (
            <div>
            Event
            {event.length 
            ? 
            <div>
                <h1> Name: {event[0].event_name}</h1>
                <EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} />
                <p> Longitude {event[0].longitude}</p>
                <p> Latitude {event[0].latitude}</p>
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
            Items 
            {loading ? 'Loading Items...' : displayRequestedItems}
                {/* google<EventMapContainer/>maps
                <EventMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `90%` }} />}
                containerElement={<div />}
                mapElement={<div style={{ height: `100%` }} />}
            /> */}
            </div>
        );
    }
} 