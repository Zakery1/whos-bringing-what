import React, { Component } from 'react';
import axios from 'axios';
import {updateUser} from '../../redux/reducer';
import {connect} from 'react-redux';

export default class Greeting extends Component{
   
     render(){
       return(
            <div className="greeting_parent">
            <p>Welcome! Please log in to view your Facebook events. Click on an event to sign up to bring items, or to see who's bringing what!</p> 
           </div>
       )
    }
}