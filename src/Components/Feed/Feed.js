import React, { Component } from 'react';
import Fetcher from '../Fetcher/Fetcher';


class Feed extends Component {
  state = {}
  render() {
    return (
      <div className="Feed_parent">
        <h1>Who Brings What?</h1>
        <Fetcher url='/api/events' render={(data) => {
          console.log('data',data)
          return ( 
            <div>
            <h1>Events</h1>
            {data.map((event,i) => <div key={i}>
            <p>{event.event_name}</p>
            </div>)}
            </div>
          )
        }}/>
      </div>
    );
  }
}

export default Feed;