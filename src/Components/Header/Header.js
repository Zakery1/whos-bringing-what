import React from 'react';
import friendsMobile from '../../styles/assets/friendsMobile.jpg';
import friendsDesktop from '../../styles/assets/friendsDesktop.jpg';

function Header() {
    return (
      <div className="Header_parent">
        <img className="Header_imageDesktop big" src={friendsDesktop} alt="friends"/>
        <img className="Header_imageMobile small" src={friendsMobile} alt="friends"/>
      </div>
    );
  }

export default Header;