import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div className="home_parent">
        {/* <h1 className="Home_header">Home</h1> */}
        <Header />
        <Footer />
      </div>
    );
  }

export default Home;