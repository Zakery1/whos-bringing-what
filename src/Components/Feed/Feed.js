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
          console.log('data',data)
          return ( 
            <div>
            <h1>Created Events</h1>
            {data.map((event,i) => <Link to='/event'><div key={i}>
            <img className='Feed_eventPhoto'src={event.cover_photo} alt="Displaying event portrait"></img>
            <h1>{event.event_name}</h1>
            <p>{event.description}</p>
            </div></Link>)}
            </div>
          )
        }}/>
        <Fetcher url='/api/invitedEvents' render={(data) => {
          console.log('data',data)
          return ( 
            <div>
            <h1>Invited Events</h1>
            {data.map((event,i) => <Link to='/event'><div key={i}>
            <img className='Feed_eventPhoto'src={event.cover_photo} alt="Displaying event portrait"></img>
            <h1>{event.event_name}</h1>
            <p>{event.description}</p>
            </div></Link>)}
            </div>
          )
        }}/>
      </div>
    );
  }
}

export default Feed;