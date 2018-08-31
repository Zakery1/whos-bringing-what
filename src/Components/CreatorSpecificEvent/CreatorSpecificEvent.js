import React, { Component } from 'react';
import axios from 'axios';
import Sugar from 'sugar';
import { get } from 'lodash/get';
Sugar.Date.extend()

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
            name: '',
            editing: false,
            selectedId: '',
            selectedName: ''
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
        if(this.state.name.length) {
            axios.post(`/api/post_requestedItem/${eventId}`, {name: this.state.name})
            .then(items => {
                console.log('items',items)
                this.setState({requestedItems: [...this.state.requestedItems].concat(items.data[0]), name: ''})
            }).catch(error => {
                console.log('Axios error POST CreatorSpecificEvent', error)
            })

        }
    }

    // Creator can delete items from requestedItems table 
    deleteItem = (id) => {
        const eventId = this.props.match.params.id
        axios.delete(`/api/delete_requestedItem/${id}/${eventId}`)
        .then(response => {
            console.log('response',response)
            this.setState({
                requestedItems: response.data
            })
        }).catch(error => {
            console.log('Axios error DELETE deleteItem', error)
        })
    }

    // Set user to be able to edit item
    editItem = (id) => {
        const index = this.state.requestedItems.findIndex(e => e.id === id)
        this.setState({
            selectedId: id,
            selectedName: this.state.requestedItems[index].name,
            editing: !this.state.editing
        })
    }

    cancel = (key) => {
        this.setState((prevState)=> {
            return {
              editing: !prevState.editing,
              selectedId: '',
              [key]: !prevState[key]
            }
        })
      }

     // Creator can edit items from requestedItems table
    saveItem = (id) => {
        const eventId = this.props.match.params.id
        axios.patch(`/api/patch_requestedItem/${id}/${eventId}`, {name: this.state.selectedName})
        .then(response => {
            this.setState({
                selectedId: '',
                selectedName: '',
                editing: !this.state.editing,
                requestedItems: response.data
            })
        })
    }
    render() {
        const { event, requestedItems, loading, name, editing, selectedId, selectedName } = this.state
        const displayRequestedItems = requestedItems.map((item,i) => {
            return(
                <div key={i}>
                    {editing ? selectedId == item.id ? <input name='selectedName' value={selectedName} onChange={(e) => this.handleInput(e)}/> : <p>{item.name}</p> : <p>{item.name}</p>}
                    {editing ? selectedId == item.id ? <button onClick={() => this.saveItem(item.id)}>Save</button> : <button onClick={() => this.editItem(item.id)}>Edit</button> : <button onClick={() => this.editItem(item.id)}>Edit</button>}
                    {editing && selectedId == item.id ? <button onClick={() => this.cancel(item.id)}>Cancel</button> : ''}                   
                    <button onClick={() => this.deleteItem(item.id)}>Delete</button>
                </div>
            )
        })
        return (
            
            <div className="Creator_event_parent">
            Event
            {event.length 
            ? 
            <div>
                <h1> Name: {event[0].event_name}</h1>
                <img className='SpecificEvent_eventPhoto' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <p>Description: {get(event, '[0].description', 'No description written')}</p>
                <p>Start Time: {new Date().long(event[0].start_time)}</p>
                <p>Place: {event[0].place ? event[0].place : 'No place given'}</p>
                <p>City: {get(event, '[0].city', 'No city given')}</p>
                <p>State: {event[0].state}</p>
                <p>Zip: {event[0].zip}</p>
                <p>Country: {event[0].country}</p>
                

            </div>
            :
            <p>Loading Event...</p>
            }
            <h1>Items</h1>
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