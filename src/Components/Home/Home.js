import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div className="Home_parent">
        Home
        <Header />
        <Footer />
        <Link to="/about">About</Link>
      </div>
    );
  }

export default Home;