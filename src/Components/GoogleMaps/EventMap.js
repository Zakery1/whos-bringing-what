import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import EventMarker from './EventMarker';

class EventMap extends Component {

render(props){
    return(
        <GoogleMap

            defaultZoom={8}

            center={ { lat: +this.props.latitude, lng: +this.props.longitude  } }
            >
            <EventMarker longitude={this.props.longitude} latitude={this.props.latitude} />
        </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(EventMap));