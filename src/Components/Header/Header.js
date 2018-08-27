import React from 'react';
import foodPlatter from '../../styles/assets/food-platter.jpg';

function Header() {
    return (
      <div className="Header_parent">
        <img className="Header_image" src={foodPlatter} alt="food platter"/>
      </div>
    );
  }

export default Header;