import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import EventComp from "../../components/eventsAdmin/Events";
import Footer from "../../components/footer/Footer";
import jwt_decode from "jwt-decode";

import "../../assets/userPage/userPage.css";
function Events() {
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, [authToken]);

  const getToken = () => {
    if (!localStorage.getItem("JWT")) {
      return navigate("/");
    }
    setAuthToken(localStorage.getItem("JWT"));
  };
  if (!localStorage.getItem("JWT")) return navigate("/");
  const token = localStorage.getItem("JWT");
  const decodedToken = jwt_decode(token);

  const handleLogOut = () => {
    localStorage.clear("JWT");
    navigate("/");
  };
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
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
        <EventComp />
      </div>
      <Footer />
    </div>
  );
}

export default Events;
