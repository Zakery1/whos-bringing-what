import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Greeting from '../Greeting/Greeting';
import {updateUser} from '../../redux/reducer';
import {connect} from 'react-redux';


function Home() {
 
   return (
     <div className="home_parent">
     
       {/* <h1 className="Home_header">Home</h1> */}
       {/* {this.props.user ? <Greeting /> : null} */}
       {/* <Greeting /> */}
       <Header />
       <Footer />
     </div>
   );

 }


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(Home);