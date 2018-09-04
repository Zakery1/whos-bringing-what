import React from 'react';
import friendsMobile from '../../styles/assets/friendsMobile.jpg';
import friendsDesktop from '../../styles/assets/friendsDesktop.jpg';
import Logo from '../../styles/assets/logo.png'

function Header() {
    return (
      <div className="header_parent">
        <div className="header_title big"><img className='logo' src={Logo} alt='logo' /></div>
        <img className="header_image_desktop big" src={friendsDesktop} alt="friends"/>
        <div className="header_title small"><img className='logo' src={Logo} alt='logo' /></div>
        <img className="header_image_mobile small" src={friendsMobile} alt="friends"/>
      </div>
    );
  }

export default Header;