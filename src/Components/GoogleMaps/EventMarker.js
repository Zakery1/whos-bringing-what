import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import axios from 'axios';
import { Link } from 'react-router-dom';

class JobMarker extends Component {
  constructor(){
    super();
    this.state = {
      event: {}
    }
  }

  componentDidMount(){
    axios.get('/api/event').then(response => {
      // console.log(response.data)
      this.setState({
        jobs: response.data
      })
    }).catch(error => {
      console.log('Axios error GET componentDidMount', error)
    })
  }

  render(){
    return(
      <div>
      <Marker
                position={ {  lat: +job.longitude, lng: +job.latitude  } }
                >
              </Marker>
      </div>
    );
  }
}


export default JobMarker;        