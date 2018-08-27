import React, { Component } from 'react';
import EventMapContainer from '../GoogleMaps/EventMapContainer';
import EventMap from '../GoogleMaps/EventMap';

const API_KEY = 'AIzaSyC7lvoQRtO4bDubVUmRQoMNl7wjQuZm-IU';

export default class SpecificEvent extends Component {
    render() {
        return (
            <div>Event
                google<EventMapContainer/>maps
                <EventMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `90%` }} />}
                containerElement={<div />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
        );
    }
} 