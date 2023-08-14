import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import CreateEvent from "../../components/createEvent/CreateEvent";

import "../../assets/updateEventPage/updateEvent.css";
import UpdateEventComponent from "../../components/updateEvent/updateEventComponent";
function UpdateEvent() {
  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>Events</h2>
          </div>
          <div className="user--component--navigation">
            <Link to="/events" id="active">
              Events
            </Link>
            <Link to="/manage-users">Users</Link>
            <Link to="/ticket-history">Ticket History</Link>
            <Link to="/user">User Details</Link>
            <Link>Log Out</Link>
          </div>
        </div>
        <UpdateEventComponent />
      </div>
    </div>
  );
}

export default UpdateEvent;
