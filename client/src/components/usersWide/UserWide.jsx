import React, { useState } from "react";
import { Link } from "react-router-dom";
import personImg from "../../assets/img/portrait.jpg";

import "../../assets/cards/userWideAdmin/wide.css";
function UserWide() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [buttonContent, setButtonContent] = useState("");

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
          <button
            onClick={() => {
              setShowPopup(true);
              setPopupContent(
                "You are about to make a user administrator of the system. Please proceed with caution."
              );
              setButtonContent("Make user admin");
            }}
            className="regular--user"
          >
            Make Admin
          </button>
          {/* <button
            onClick={() => {
              setShowPopup(true);
              setPopupContent(
                "You are about to downgrade a user from administrator. Please proceed with caution."
              );
              setButtonContent("Downgrade user");
            }}
            className="admin--user"
          >
            Make User
          </button> */}
          <button
            onClick={() => {
              setShowPopup(true);
              setPopupContent(
                "You are about to delete a user. Please proceed with caution."
              );
              setButtonContent("Delete user");
            }}
          >
            Delete User
          </button>
        </div>
        {showPopup && (
          <div className="popup--users">
            <div className="popup--users--subdiv">
              <h2>Are you sure?</h2>
              <p>{popupContent}</p>
            </div>
            <div className="popup--users--actions">
              <button
                className="popup--users--action--cancel"
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                Cancel
              </button>
              <button className="popup--users--action--commit">
                {buttonContent}
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default UserWide;
