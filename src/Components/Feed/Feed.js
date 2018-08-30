import React, { Component } from 'react';
import Fetcher from '../Fetcher/Fetcher';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import Sugar from 'sugar';
Sugar.Date.extend()


class Feed extends Component {
  state = {}
  // DaysUntil=new Date().daysUntil({event.start_time})
  render() {
    console.log(Sugar + "")
    return (
      <div className="main">
      <div>
      <div className="Feed_parent small">
        <div className="Feed_title">Who's Bringing What? </div>
        <Fetcher url='/api/createdEvents' render={(data) => {
          return ( 
            <div >
              <div className="Feed_blank_small"></div>
              <div className="Feed_event">Events I'm hosting:</div>
              {data.map((event,i) => <Link to={`/creatorSpecificEvent/${event.id}`} key={i}><div>
              <div className="Feed_blank_small"></div>
              <div className="Feed_group">
              <div className="Feed_event_name">{event.event_name}</div>
              <div><img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="Feed_event_description">{<ReadMoreReact text={event.description} max={100} />}</div>
              <div className="Feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!!</div>
              </div>
              </div></Link>)}
            </div>
          )
        }}/>
        <Fetcher url='/api/invitedEvents' render={(data) => {
          return ( 
            <div>
              <div className="Feed_blank_small"></div>
              <div className="Feed_event">Events I'm invited to:</div>
              {data.map((event,i) => <Link to={`/specificEvent/${event.id}`} key={i}><div>
              <div className="Feed_blank_small"></div>
              <div className="Feed_group">
              <div className="Feed_event_name">{event.event_name}</div>
              <div className="Feed_photo"><img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="Feed_event_description">{<ReadMoreReact text={event.description} max={100} />}</div>
              <div className="Feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>)}
              <div className="Feed_footer"></div>
            </div>
        
          )
        }}/>
        </div>
        </div>


 <div className="Feed_big">
      <div className="Feed_parent big">
        <div className="Feed_title">Who's Bringing What?</div>
        <Fetcher url='/api/createdEvents' render={(data) => {
          return ( 
            <div>
              <div className="Feed_blank"></div>
              <div className="Feed_event"><p>Events I'm hosting:</p></div>
              {data.map((event,i) => <Link to={`/creatorSpecificEvent/${event.id}`} key={i}><div>
              <div className="Feed_blank"></div>
              <div className="Feed_group">
              <div className="Feed_event_name">{event.event_name}</div>
              <div className="Feed_photo"><img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="Feed_event_description">{<ReadMoreReact text={event.description} max={200} />}</div>
              <div className="Feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!!</div>
              </div>
              </div></Link>)}
            </div>
          )
        }}/>
        <Fetcher url='/api/invitedEvents' render={(data) => {
          return ( 
            <div>
              <div className="Feed_blank"></div>
              <div className="Feed_event"><p>Events I'm invited to:</p></div>
              {data.map((event,i) => <Link to={`/specificEvent/${event.id}`} key={i}><div>
              <div className="Feed_blank"></div>
              <div className="Feed_group">
              <div className="Feed_event_name">{event.event_name}</div>
              <div className="Feed_photo"><img className='Feed_eventPhoto' src={event.cover_photo} alt="Displaying event portrait"/></div>
              <div className="Feed_event_description">{<ReadMoreReact text={event.description} max={200} />}</div>
              <div className="Feed_event_date">Event starts in {new Date().daysUntil(event.start_time)} days!!</div>
              </div>
              </div></Link>)}
            </div>
        
          )
        }}/>
        </div>
        </div>
        </div>

    );
  }
}

export default Feed;