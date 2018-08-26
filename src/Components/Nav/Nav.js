import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
    return (
      <div className="Nav_parent">

        <div className="Nav_small">
            <Link to="/">Feed small</Link>
            <Link to="/about" >About</Link>
            <button>Logout</button>
        </div>

        <div className="Nav_big">
            <Link to="/">Feed</Link>
            <Link to="/about" >About</Link>
            <button>Logout</button>
        </div>

      </div>
    );
  }

export default Nav;
