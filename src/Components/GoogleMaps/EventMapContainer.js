import React, { Component } from 'react';
import EventMap from './EventMap';


var API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API 

class EventMapContainer extends Component {

    render() {
        return (
            <EventMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `90%` }} />}
                containerElement={<div />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default EventMapContainer;