import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/reducer';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/icomoon/home';
import {menu} from 'react-icons-kit/icomoon/menu';
import {ic_tag_faces} from 'react-icons-kit/md/ic_tag_faces';
import {login} from 'react-icons-kit/iconic/login';
import {logout} from 'react-icons-kit/iconic/logout';
import {user_circle} from 'react-icons-kit/ikons/user_circle';
import { withClientState } from 'apollo-link-state';


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
              <div className="Nav_mobileIcons" style={{ color: 'white' }}> <Icon size={32} icon={user_circle} /> <p >{username ? `${username}` : "No User"}</p></div>
              <Link to="/" className="Nav_linkMobile" data-cy="home" style={{ color: 'white' }}><Icon size={32} icon={home} /> <p>Home</p> </Link>
              <Link to="/feed" className="Nav_linkMobile" data-cy="feed" style={{ color: 'white' }}><Icon size={32} icon={menu} /> <p>Feed</p> </Link>
              <Link to="/about" className="Nav_linkMobile" data-cy="about" style={{ color: 'white' }}> <Icon size={32} icon={ic_tag_faces} /> <p>About</p> </Link>
              {username ? <Link className="Nav_linkMobile" data-cy='login' to='/' ><button className="Nav_linkMobile" style={{ color: 'white' }} onClick={()=>this.logout()}> <Icon size={28} icon={logout} /> <p>Logout</p> </button></Link> 
              : <button className="Nav_linkMobile" data-cy='logout' style={{ color: 'white' }} onClick={() => {this.login()}}> <Icon size={28} icon={login} /> <p>Login</p>  </button>}
          </div>

          <div className="Nav_container big">
              <p className="Nav_desktop_link" >{username ? username : ""}</p>
               <Link to="/" className="Nav_desktopLink" data-cy="Home">Home</Link>
               <Link to="/feed" className="Nav_desktopLink" data-cy="Feed">Feed</Link>
               <Link to="/about" className="Nav_desktopLink" data-cy="About">About</Link>
              {username ? <Link className="Nav_desktopLink" data-cy="Logout" onClick={()=>this.logout()} to='/'>Logout</Link> 
              : <button className="Nav_desktopLink_login" data-cy="login1" onClick={() => {this.login()}}>Login</button>}
          </div>

        </div>
      );
    }
  }

export default connect(null, { updateUser })(Nav);
