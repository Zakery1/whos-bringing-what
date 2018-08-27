import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import EventMarker from './EventMarker';

class EventMap extends Component {

render(){

    return(
        <GoogleMap
            defaultZoom={2.7}
            mapTypeId='satellite'
            center={ { lat: 40.5928, lng: 50.3055  } }
            >
            <EventMarker isMarkerShown={false} location={this.props.location} />
        </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(EventMap));