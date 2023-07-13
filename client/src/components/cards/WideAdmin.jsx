import React, { useState } from "react";
import { Link } from "react-router-dom";
import imgPath from "../../assets/img/xzibit.jpg";

import "../../assets/cards/wideAdmin/wideAdmin.css";
function WideAdmin() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="wide--event--admin--card--parent">
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
            <button
              onClick={() => {
                setShowPopup(true);
              }}
              className="wide--event--admin--description--values--action"
            >
              Delete Event
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="are--you--sure--delete--post">
            <div className="are--you--sure--delete--post--subdiv">
              <h2>Are you sure?</h2>
              <p>
                You are about to delete an event from the system. Please proceed
                with caution
              </p>
            </div>
            <div className="are--you--sure--delete--post--actions">
              <button
                onClick={() => setShowPopup(false)}
                className="cancel--event--actions"
              >
                Cancel
              </button>
              <button className="del--event--actions">Delete event</button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default WideAdmin;
