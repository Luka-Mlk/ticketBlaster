import React from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import EventComp from "../../components/eventsAdmin/Events";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function Events() {
  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>Events</h2>
            <Link to="/create-event" className="create--event--button">
              Create Event
            </Link>
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
        <EventComp />
      </div>
      <Footer />
    </div>
  );
}

export default Events;
