import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Grid extends Component {

  state = {
    email: {
      recipient: '',
      sender: '',
      subject: '',
      text: '',
      sendEmail: false
    }
  }


  sendEmail = _ => {
    const { email } = this.state;


    axios.get(`/send-email/${this.props.match.params.id}`, {email} ).then(response => {
      console.log(response);
    })
    fetch(`http://127.0.0.1:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`).then(response => response.json()).then(response => response) //query string url
      .catch(err => console.error(err))
  }

  showEmailForm() {
    this.setState({
      sendEmail: !this.state.sendEmail
    })
  }



  componentDidMount(){
    axios.get('/api/users_invited_event/:eventId', ).then(response => {
      this.setState({
        posts: response.data
      })
    })
    }

  render() {
    console.log(this.props.match.params.id)
    console.log(this.state)
    const { email } = this.state;
    const spacer = {
      margin: 10
    }
    const textArea = {
      borderRadius: 4
    }
    return (
      <div className="Grid">
        {this.state.sendEmail ? 
        <div style={{ marginTop: 10 }} >
          <h4> Send Email </h4>
          {/* <label> Recipient </label> */}
          <button className='myButton' onClick={()=>this.showEmailForm()}>Cancel</button>
      
          {/* <input value={email.recipient}
            onChange={e => this.setState({ email: { ...email, recipient: e.target.value } })} /> */}
          <div style={spacer} />
          <label> Subject </label>
          <br />
          <input value={email.subject}
            onChange={e => this.setState({ email: { ...email, subject: e.target.value } })} />
          <div style={spacer} />
          <label> Message </label>
          <br />
          <textarea rows={3} value={email.text} style={textArea}
            onChange={e => this.setState({ email: { ...email, text: e.target.value } })} />
          <div style={spacer} />
          <button className='myButton' onClick={this.sendEmail}> Send Email </button>
        </div>  : <button className='myButton' onClick={() => this.showEmailForm()}>Send Us An Email</button> }

      </div>
    );
  }
}

export default withRouter(Grid);