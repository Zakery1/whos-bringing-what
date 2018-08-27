import React, { Component } from 'react';
import EventMap from './EventMap';


process.env.REACT_APP_GOOGLE_MAPS_API = API_KEY

class EventMapContainer extends Component {

    render() {
        return (
            <JobMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `90%` }} />}
                containerElement={<div />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}