import React, { Component } from 'react';
import Fetcher from '../Fetcher/Fetcher';
import { Link } from 'react-router-dom';



class Feed extends Component {
  state = {}
  render() {
    return (
      <div className="Feed_parent">
        <h1>Who Brings What?</h1>
        <Fetcher url='/api/createdEvents' render={(data) => {
          return ( 
            <div>
            <h1>Created Events</h1>
            {data.map((event,i) => <Link to={`/creatorSpecificEvent/${event.id}`} key={i}><div>
            <img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/>
            <h1>Name: {event.event_name}</h1>
            <p>Description: {event.description}</p>
            <p>Start Time: {event.start_time}</p>
            </div></Link>)}
            </div>
          )
        }}/>
        <Fetcher url='/api/invitedEvents' render={(data) => {
          return ( 
            <div>
            <h1>Invited Events</h1>
            {data.map((event,i) => <Link to={`/specificEvent/${event.id}`} key={i}><div>
            <img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/>
            <h1>Name: {event.event_name}</h1>
            <p>Description: {event.description}</p>
            <p>Start Time: {event.start_time}</p>
            </div></Link>)}
            </div>
          )
        }}/>
      </div>
    );
  }
}

export default Feed;