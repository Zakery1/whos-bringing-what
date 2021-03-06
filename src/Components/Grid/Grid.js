import React, { Component } from 'react';



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
    fetch(`http://127.0.0.1:4000/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`) //query string url
      .catch(err => console.error(err))
      this.showEmailForm()
  }

  showEmailForm() {
    this.setState({
      sendEmail: !this.state.sendEmail
    })
  }

  render() {
    const { email } = this.state;
    const spacer = {
      margin: 10
    }
    const textArea = {
      borderRadius: 4
    }
    console.log(this.props)
    return (
      <div className="Grid">
        {this.state.sendEmail ? 

        <div style={{ marginTop: 10 }} >
          {/* <label> Recipient </label> */}
          <button className='myButton' onClick={()=>this.showEmailForm()}>Cancel</button>
          {/* <input value={email.recipient}
            onChange={e => this.setState({ email: { ...email, recipient: e.target.value } })} /> */}
          <div style={spacer} />
          <p style={{fontSize: "25px"}}> Your Email Address </p>
          
          <input value={email.sender}
            onChange={e => this.setState({ email: { ...email, sender: e.target.value } })} />
          <div style={spacer} />
          <p style={{fontSize: "25px"}}> Subject </p >
          <input value={email.subject}
            onChange={e => this.setState({ email: { ...email, subject: e.target.value } })} />
          <div style={spacer} />
          <p style={{fontSize: "25px"}}> Message </p >
          <textarea rows={3} value={email.text} style={textArea}
            onChange={e => this.setState({ email: { ...email, text: e.target.value } })} />
          <div style={spacer} />
          <button className='myButton' onClick={this.sendEmail}> Send Email </button>
        </div>  : <button className='myButton' onClick={() => this.showEmailForm()}>Send us an email!</button> }

      </div>
    );
  }
}

export default Grid;
