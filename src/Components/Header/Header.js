import React from 'react';
import friendsMobile from '../../styles/assets/friendsMobile.jpg';
import friendsDesktop from '../../styles/assets/friendsDesktop.jpg';
import Logo from '../../styles/assets/logo.png'

function Header() {
    return (
      <div className="header_parent">
          <div className='header small'>
          <div className="header_title"><img className='title_logo' src={Logo} alt='logo' /></div>
          </div>
          <div className="header big">
          <div className="header_big">
          <div className="header_title"><img className='title_logo' src={Logo} alt='logo' /></div>
          </div>
          </div>
      </div>
    );
  }

export default Header;