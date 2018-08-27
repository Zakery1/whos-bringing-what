import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import axios from 'axios';

class Nav extends Component {
  constructor() {
    super() 
    this.state={
      username: ''
    }
  }

  componentDidMount(){
    axios.get('/api/user-data').then(response => {
      this.setState({
        username: response.data.username,
      })
      this.props.updateUser(response.data)
    }).catch(error => {
      console.log('Axios error GET with componentDidMount on Nav.js', error)
    })
  }

  login = () => {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
  }

  logout = () => {
    axios.post('/api/auth/logout').then(response => {
      this.setState({
        username: '',
      })
      window.alert('Successfully logged out')
    }).catch(error => console.log('error',error))
  }
    render() {
      const { username } = this.state
      return (
        <div className="Nav_parent">

          <div className="Nav_container small">
              <p>{username ? "Welcome: " + username : "No user is logged in"}</p>
              <Link to="/" className="Nav_homeLink">Home</Link>
              <Link to="/feed" className="Nav_feedLink">Feed </Link>
              <Link to="/about" className="Nav_aboutLink">About</Link>
              {username ? <Link to='/'><button onClick={()=>this.logout()}> Logout</button></Link> : <button onClick={() => {this.login()}}>Login</button>}
          </div>

          <div className="Nav_container big">
              <p>{username ? "Welcome: " + username : "No user is logged in"}</p>
              <Link to="/" className="Nav_homeLink">Home</Link>
              <Link to="/feed" className="Nav_feedLink">Feed</Link>
              <Link to="/about" className="Nav_aboutLink">About</Link>
              {username ? <Link to='/'><button onClick={()=>this.logout()}> Logout</button></Link> : <button onClick={() => {this.login()}}>Login</button>}
          </div>

        </div>
      );
    }
  }

export default connect(null, { updateUser })(Nav);
