import React, { Component }from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
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
// import { withClientState } from 'apollo-link-state';


class Nav extends Component {
  constructor() {
    super() 
    this.state={
      username: '',
      currentPage: "feed"
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
      const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          props.user.username
            ? <Component {...props} />
            : <Redirect to='/' />
        )} />
      )
      return (
        <div className="nav_parent">

          <div className="nav_container small">
              <div className="nav_icon_container">
                  <div className="nav_link_mobile"> <Icon size={32} icon={user_circle} /> <p>{username ? `${username}` : "No User"}</p></div>
                  <Link to="/" className="nav_link_mobile" data-cy="home"><Icon size={32} icon={home} /> <p>Home</p> </Link>
                  {username ? <Link to="/feed" className="nav_link_mobile" data-cy="feed"><Icon size={32} icon={menu} /> <p>Feed</p> </Link> : ''}
                  <Link to="/about" className="nav_link_mobile" data-cy="about"> <Icon size={32} icon={ic_tag_faces} /> <p>About</p> </Link>
                  {username 
                  ? 
                  <Link className="nav_link_mobile" data-cy='login' to='/'> <Icon onClick={()=>this.logout()} size={32} icon={logout} /> <p>Logout</p></Link> 
                  : <span className="nav_link_mobile" data-cy='logout' onClick={() => {this.login()}}> <Icon size={32} icon={login} /> <p>Login</p>  </span>}
              </div>
          </div>

          <div className="nav_container big">
              <div className="nav_desktop_link" >Welcome <p>{username ? username : ""}</p></div>
              
               <Link to="/" onClick={() => this.setState({currentPage: "home"})} className={"nav_desktop_link " + (this.state.currentPage==="home" ? "active" : "" )} data-cy="Home">Home</Link>
               {username ? <Link to="/feed" onClick={() => this.setState({currentPage: "feed"})} className={"nav_desktop_link " + (this.state.currentPage==="feed" ? "active" : "" )} data-cy="Feed">Feed</Link> : ''}
               <Link to="/about" onClick={() => this.setState({currentPage: "about"})} className={"nav_desktop_link " + (this.state.currentPage==="about" ? "active" : "" )} data-cy="About">About</Link>
              {username ? <Link className="nav_desktop_link" data-cy="Logout" onClick={()=>this.logout()} to='/'>Logout</Link> 
              : <span className="nav_desktop_link" data-cy="login1" onClick={() => {this.login()}}>Login</span>}
          </div>

        </div>
      );
    }
  }

export default connect(null, { updateUser })(Nav);
