import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import axios from 'axios';
import { Link } from 'react-router-dom';

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