import React, { Component } from 'react';
import { Marker } from "react-google-maps";


class EventMarker extends Component {

  render(){
    console.log(this.props.latitude)
    return(
      <div>
              <Marker
                position={ {  lat: +this.props.latitude, lng: +this.props.longitude  } }
                >
              </Marker>
      </div>
    );
  }
}


export default EventMarker;        