import React from 'react';
import friendsMobile from '../../styles/assets/friendsMobile.jpg';
import friendsDesktop from '../../styles/assets/friendsDesktop.jpg';

function Header() {
    return (
      <div className="header_parent">
        <img className="header_image_desktop big" src={friendsDesktop} alt="friends"/>
        <img className="header_image_mobile small" src={friendsMobile} alt="friends"/>
      </div>
    );
  }

export default Header;