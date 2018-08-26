import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
    return (
      <div className="Nav_parent">
        
        <Link>Feed</Link>
        <Link>About</Link>
        <Link>Logout</Link>
      </div>
    );
  }

export default Nav;
