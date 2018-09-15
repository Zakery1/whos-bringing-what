import React, { Component } from 'react';
import axios from 'axios';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import Sugar from 'sugar';
Sugar.Date.extend();
const get = require('lodash/get');

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
            console.log("specific event response****", response)
            this.setState({
              username: response.data.username,
              userId: response.data.id
            })
          }).catch(error => {
            console.log('Axios error GET with componentDidMount on SpecificEvent.js', error)
          })

        const eventId = this.props.match.params.id

        this.setState({
            loading: true
        })

        function fetchEvent() {
            return axios.get(`/api/event/${eventId}`);
        }
        
        function fetchRequestedItems() {
            return axios.get(`/api/requested_items/${eventId}`);
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
        axios.patch(`/api/patch_spoken_for_item/${eventId}/${userId}/${id}`)
        .then( response => {
            this.setState({
                requestedItems: response.data
            })
        })
    }

    unassignItem = (id) => {
        const eventId = this.props.match.params.id
        axios.patch(`/api/patch_assigned_item/${eventId}/${id}`)
        .then( response => {
            this.setState({
                requestedItems: response.data
            })
        })
    }

    render() {
        // console.log(this.state.requestedItems,'specific evens requested items')
        const { username, event, requestedItems, loading } = this.state
        const displayRequestedItems = requestedItems.map((item,i) => {
            console.log(item, "specific event")
            return(

                <div className='requested_items_each' style={item.spokenfor ? { textDecoration: 'line-through'} : { textDecoration: 'none'} } key={i}>              
                     <div className='requested_item_name'>
                             <p>{item.name}</p>
                             <div className='requested_item_button'><button className='myButton' onClick={() => this.spokenFor(item.id)} disabled={item.spokenfor}>Click to bring</button></div>
                     </div>

                </div>

            
            )
        })

        const willBringItems = requestedItems.filter(item => item.user_id === this.state.userId )

        const displayWillBringItems = willBringItems.map((item,i) => {
            return(

                <div className='items_bringing' key={i}>
                    <div className="will_bring_items">
                        <div className='will_bring_name'>
                        <p>{item.name}</p>

                        </div>
                        <div className='requested_item_button'><button className='myButton' onClick={() => this.unassignItem(item.id)}>Unassign item</button></div>
                    </div>
                </div>
            )
        })

        return (

            <div className="specific_event_parent">
            <div className="specific_event small">
            {event.length 
            ? 
            <div>
                <h1 className='specific_event_name'>{event[0].event_name}</h1>
                <img className='event_photo' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <div className='specific_event_map'> <EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} /></div>
            <div className='specific_event_info'>
                <p>Description: {event[0].description ? event[0].description : 'No description written'}</p>

                <p>Start Time: {`${Date.create(get(event[0], "start_time", ""))}`}</p>
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
            <div className="requested_list_items">
                    <div className="requested_items_table">
                    <div className="needed_items">
                    The host is requesting these items:
                    <div className="needed_items_each">{loading ? 'Loading Items...' : displayRequestedItems}</div>
                    </div>   
                    </div>
                 <div className="will_bring_table">
                     {username} is bringing:
                     {loading ? 'Loading my Items' : displayWillBringItems}
                </div>
            </div>
            </div>

<div className="specific_event big">
            {event.length 
            ? 
            <div classname='specefic_event_container'>
                <h1 className='specific_event_name'>{event[0].event_name}</h1>
                <img className='specific_event_photo' src={event[0].cover_photo} alt="Displaying event portrait"/>
                <div className='specific_event_map'> <EventMapContainer longitude={event[0].longitude} latitude={event[0].latitude} /></div>
                <div className='specific_event_info'>
                <p>Description: {event[0].description ? event[0].description : 'No description written'}</p>
                <p>Start Time: {`${Date.create(get(event[0], "start_time", ""))}`}</p>

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
            <div className="requested_items_container">
                <div className="requested_items">
                    <div className="needed_items">
                        <div className="needed_text">  The host would like you to bring:
                         <div className="needed_items_items"> {loading ? 'Loading Items...' : displayRequestedItems}</div>
                        </div>  
                    </div> 
                    <div >
                        <div className='will_bring_title'>{username} is bringing:</div>
                            <div className="will_bring_table">
                                {loading ?   'Loading my Items' : displayWillBringItems}
                            </div>
                    </div>
                </div>
            </div>
 </div>
</div>
           
        );
    }
} 