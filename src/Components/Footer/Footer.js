import React from 'react';
import friendsMobile from '../../styles/assets/friendsMobile.jpg';
import friendsDesktop from '../../styles/assets/friendsDesktop.jpg';



function Footer() {
    return (
      <div className="footer_parent">
      <div className="footer small">
          <div className="footer_parent">
          <img className="footer_image" src={friendsMobile} alt="friends"/>
          </div>
          </div>

      <div className="footer big">
          <div className="footer_parent">
          <img className="footer_image" src={friendsDesktop} alt="friends"/>
          </div>
         </div> 
        </div>
    );
  }

export default Footer;
