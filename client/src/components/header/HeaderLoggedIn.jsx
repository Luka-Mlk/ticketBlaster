import "../../assets/header/header.css";
import React from "react";
import { Link } from "react-router-dom";
import ticketBlasterLogo from "../../assets/img/ticketBlaster.svg";

function HeaderLoggedIn() {
  return (
    <header>
      <div className="header--side--wrap">
        <div className="header--left--items">
          <Link to="/">
            <img src={ticketBlasterLogo} alt="ticket blaster logo" />
          </Link>
          <Link to="/events/concert">Musical Concerts</Link>
          <Link to="/events/standup">Stand-up Comedy</Link>
        </div>
        <div className="header--right--items">
          <form action="">
            <input type="text" placeholder="Search" />
          </form>
          <Link id="cart--icon" to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link id="profile" to="/profile">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderLoggedIn;
