import React, { Component } from 'react';
import Fetcher from '../Fetcher/Fetcher';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import Sugar from 'sugar';
Sugar.Date.extend()


class Feed extends Component {
  constructor(){
    super();
    this.state = {
      user: []
    }
  }
  componentDidMount() {
    axios
      .get('/api/user')
      .then(response => {
        console.log('response', response.data)
        this.setState({user: response.data})
      })
      .catch(error => {
        console.log('Axios error GET componentDidMount', error)
      })
  }
  // DaysUntil=new Date().daysUntil({event.start_time})
  render() {
    const { user } = this.state
    console.log('user',user)
    // console.log(Sugar + "")
    return (
      user.length
      ? 
      <div className="main">
      <div>
      <div className="feed_parent small">
        <div className="feed_title">Who's Bringing What? </div>
        <Fetcher url='/api/createdEvents' render={(data) => {
        const result = data.filter(thing => new Date(thing.start_time).isPast() === false)
        return ( 
          <div>
                <div className="feed_blank_small"></div>
                <div className="feed_event">Events I'm hosting:</div>
            {result.map((event,i) => {
                  return(
                    <Link to={`/creator_specific_event/${event.id}`} key={i}>
                      <div className="feed_blank_small"></div>
                      <div className="feed_group">
                      <div className="feed_event_name">{event.event_name}</div>
                      <div><img className='feed_event_photo' src={event.cover_photo} alt="Displaying event portrait"/></div>
                      <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={100} />}</div>
                      <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!!</div>
                    </div></Link>)}
            )}
          </div>
                )}}/>

        <Fetcher url='/api/invited_events' render={(data) => {
          const result = data.filter(thing => new Date(thing.start_time).isPast() === false)
          return ( 
            <div>
              <div className="feed_blank_small"></div>
              <div className="feed_event">Events I'm invited to:</div>
              {result.map((event,i) => user[0].auth0_id === event.creator_id 
              ?  
              <Link to={`/hostSpecificEvent/${event.id}`} key={i}><div>
              <div className="feed_blank"></div>
              <div className="feed_group">
              <div className="feed_event_name">{event.event_name}</div>
              <div className="feed_photo"><img className='feed_event_photo' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={200} />}</div>
              <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>
              :
              <Link to={`/specificEvent/${event.id}`} key={i}><div>
              <div className="feed_blank"></div>
              <div className="feed_group">
              <div className="feed_event_name">{event.event_name}</div>
              <div className="feed_photo"><img className='feed_event_photo' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={200} />}</div>
              <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>
              )}
              <div className="feed_footer"></div>
            </div>
          )
        }}/>
        </div>
        </div>
       

 <div className="feed_big">
      <div className="feed_parent big">
        <div className="feed_title">Who's Bringing What?</div>
        <Fetcher url='/api/createdEvents' render={(data) => {
          const result = data.filter(thing => new Date(thing.start_time).isPast() === false)
          return ( 
            <div>
              <div className="feed_blank"></div>
              <div className="feed_event"><p>Events I'm hosting:</p></div>
              {result.map((event,i) => <Link to={`/creatorSpecificEvent/${event.id}`} key={i}><div>
              <div className="feed_blank"></div>
              <div className="feed_group">
              <div className="feed_event_name">{event.event_name}</div>
              <div className="feed_photo"><img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={200} />}</div>
              <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!!</div>
              </div>
              </div></Link>)}
            </div>
          )
        }}/>
        <Fetcher url='/api/invited_events' render={(data) => {
          const result = data.filter(thing => new Date(thing.start_time).isPast() === false)
          return ( 
            <div>
              <div className="feed_blank"></div>
              <div className="feed_event"><p>Events I'm invited to:</p></div>
              {result.map((event,i) => user[0].auth0_id === event.creator_id 
              ?  
              <Link to={`/hostSpecificEvent/${event.id}`} key={i}><div>
              <div className="feed_blank"></div>
              <div className="feed_group">
              <div className="feed_event_name">{event.event_name}</div>
              <div className="feed_photo"><img className='feed_event_photo' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={200} />}</div>
              <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>
              :
              <Link to={`/specificEvent/${event.id}`} key={i}><div>
              <div className="feed_blank"></div>
              <div className="feed_group">
              <div className="feed_event_name">{event.event_name}</div>
              <div className="feed_photo"><img className='feed_event_photo' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="feed_event_description">{<ReadMoreReact text={event.description ? event.description : ''} max={200} />}</div>
              <div className="feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>
              )}
            </div>
          )
        }}/>
        </div>
        </div>
        </div>
        : 'Loading '
    );
  }
}

export default Feed;