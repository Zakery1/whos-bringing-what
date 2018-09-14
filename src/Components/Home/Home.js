import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Greeting from '../Greeting/Greeting';
import {updateUser} from '../../redux/reducer';
import {connect} from 'react-redux';


function Home(props) {
 
   return (
     <div className="home_parent">
       <Header />
       {props.user.username ? "" : <Greeting />}
       <Footer />
     </div>
   );
 }


const mapStateToProps = state => {
  const {user} = state;
  return{
    user 
  }
}

export default connect(mapStateToProps)(Home);