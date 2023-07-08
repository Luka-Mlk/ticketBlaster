import React from "react";
import { Link } from "react-router-dom";
import imgPath from "../../assets/img/xzibit.jpg";

import "../../assets/cards/wideAdmin/wideAdmin.css";
function WideAdmin() {
  return (
    <div className="wide--event--admin--card">
      <div className="wide--event--admin--image--wrapper">
        <img src={imgPath} alt="event image" />
      </div>
      <div className="wide--event--admin--description">
        <div className="wide--event--admin--description--text--wrapper">
          <div className="wide--event--admin--desctiption--1">
            <h3>Event name</h3>
            <h4>Date</h4>
          </div>
          <div className="wide--event--admin--desctiption--2">
            <p>Location</p>
          </div>
        </div>
        <div className="wide--event--admin--description--values">
          <Link className="wide--event--admin--description--values--action">
            Delete Event
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default WideAdmin;
