import React from "react";
import imgPath from "../../assets/img/xzibit.jpg";
import "../../assets/cards/wide/wide.css";
import { Link } from "react-router-dom";

function WideCard() {
  return (
    <div className="wide--event--card">
      <div className="wide--event--image--wrapper">
        <img src={imgPath} alt="event image" />
      </div>
      <div className="wide--event--description">
        <div className="wide--event--description--text">
          <h3>Event name</h3>
          <h4>Date</h4>
          <p>Location</p>
        </div>
        <div className="wide--event--description--values">
          <h3>$120.00 USD</h3>
          <h4>2 x $60.00 USD</h4>
          <Link className="wide--event--description--values--action">
            Remove
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default WideCard;
