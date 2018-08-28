import React, { Component } from 'react';
import axios from 'axios';
// import EventMapContainer from '../GoogleMaps/EventMapContainer';
// import EventMap from '../GoogleMaps/EventMap';

// const API_KEY = 'AIzaSyC7lvoQRtO4bDubVUmRQoMNl7wjQuZm-IU';

export default class CreatorSpecificEvent extends Component {
    constructor() {
        super()
        this.state = {
            event: [],
            requestedItems: [],
            loading: false,
            name: ''
        }
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

    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value})
    }
    // Creator can add items to requestedItems table
    addItem = () => {
        const eventId = this.props.match.params.id
        axios.post(`/api/post_requestedItem/${eventId}`, {name: this.state.name})
        .then(items => {
            console.log('items',items)
            this.setState({requestedItems: [...this.state.requestedItems].concat(items.data[0]), name: ''})
        }).catch(error => {
            console.log('Axios error POST CreatorSpecificEvent', error)
        })
    }

    render() {
        const { event, requestedItems, loading, name } = this.state
        console.log(this.state.requestedItems)
        const displayRequestedItems = requestedItems.map((item,i) => {
            return(
                <div key={i}>
                    <p>{item.name}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            )
        })
        return (
            <div>
            Event
            {event.length 
            ? 
            <div>
                <h1>{event[0].event_name}</h1>
                <img className='SpecificEvent_eventPhoto' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <p>{event[0].description}</p>
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
            <input onChange={(e) => this.handleInput(e)} name='name' value={name} type='text' placeholder="Add item" />
            <button onClick={() => this.addItem()}>Add Item</button>
            </div>
        );
    }
} 