import React from "react";
import { Link } from "react-router-dom";
import personImg from "../../assets/img/portrait.jpg";

import "../../assets/cards/userWideAdmin/wide.css";
function UserWide() {
  return (
    <div className="user--wide--card--wrapper">
      <div className="user--wide--card">
        <div className="user--wide--description--content">
          <div className="user--wide--img--wrapper">
            <img src={personImg} alt="user image" />
          </div>
          <div className="user--wide--description--content--personal">
            <p>Name</p>
            <p>Email</p>
          </div>
        </div>
        <div className="user--wide--card--actions">
          <Link className="regular--user">Make Admin</Link>
          <Link>Delete User</Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default UserWide;
