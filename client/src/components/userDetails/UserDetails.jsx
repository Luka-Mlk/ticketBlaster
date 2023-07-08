import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../../assets/userDetails/userDetails.css";
import imgPath from "../../assets/img/portrait.jpg";
function UserDetails() {
  const [resetPassVisibility, setVisibility] = useState(false);

  const toggleVis = (e) => {
    e.preventDefault();
    setVisibility(!resetPassVisibility);
  };

  return (
    <form className="user--details--form" action="">
      <div className="user--details--img--and--name--div">
        <div className="user--details--img--wrapper">
          <img src={imgPath} alt="person image" />
        </div>
        <div className="user--details--full--name--div">
          <label htmlFor="">Full Name</label>
          <input type="text" name="" id="" />
        </div>
      </div>
      <div className="user--details--upload--avatar--and--email">
        <button className="user--details--upload--avatar--button">
          Upload Avatar
        </button>
        <div className="user--details--email--div">
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
      </div>
      <div className="user--details--submit--button">
        <button>Submit</button>
      </div>
      <div className="user--details--password--change--div">
        <h3>Password</h3>
        <button
          onClick={toggleVis}
          className="user--details--password--change--button"
        >
          Change Password
        </button>
      </div>
      {resetPassVisibility && (
        <div className="user--details--retype--wrapper">
          <div className="user--details--retype--password">
            <div className="user--detials--initial--password--div">
              <label htmlFor="">Password</label>
              <input type="text" />
            </div>
            <div className="user--details--re--type--password--div">
              <label htmlFor="">Re-type Password</label>
              <input type="text" />
            </div>
          </div>
          <div className="user--details--submit--password--button">
            <button>Submit</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default UserDetails;
