import "../../assets/header/header.css";
import React from "react";
import { Link } from "react-router-dom";
import ticketBlasterLogo from "../../assets/img/ticketBlaster.svg";

function Header() {
  return (
    <header>
      <div className="header--side--wrap">
        <div className="header--left--items">
          <Link>
            <img src={ticketBlasterLogo} alt="ticket blaster logo" />
          </Link>
          <Link>Musical Concerts</Link>
          <Link>Stand-up Comedy</Link>
        </div>
        <div className="header--right--items">
          <input type="text" placeholder="Search" />
          <button>Log In</button>
          <button>Create Account</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
