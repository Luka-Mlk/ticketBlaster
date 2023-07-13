import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import Events from "../../components/eventsAdmin/Events";
import Users from "../../components/usersAdmin/Users";
import TicketHistory from "../../components/ticketHistory/TicketHistory";
import UserDetails from "../../components/userDetails/UserDetails";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function User() {
  const componentMap = {
    Events,
    Users,
    TicketHistory,
    UserDetails,
  };

  const [activeComponent, setActiveComponent] = useState("UserDetails");

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  const ActiveComponent = componentMap[activeComponent];

  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>{activeComponent}</h2>
            {activeComponent === "Events" ? (
              <button className="create--event--button">Create Event</button>
            ) : (
              ""
            )}
          </div>
          <div className="user--component--navigation">
            <Link
              id={activeComponent === "Events" ? "active" : ""}
              onClick={() => handleComponentChange("Events")}
            >
              Events
            </Link>
            <Link
              id={activeComponent === "Users" ? "active" : ""}
              onClick={() => handleComponentChange("Users")}
            >
              Users
            </Link>
            <Link
              id={activeComponent === "TicketHistory" ? "active" : ""}
              onClick={() => handleComponentChange("TicketHistory")}
            >
              Ticket History
            </Link>
            <Link
              id={activeComponent === "UserDetails" ? "active" : ""}
              onClick={() => handleComponentChange("UserDetails")}
            >
              User Details
            </Link>
            <Link>Log Out</Link>
          </div>
        </div>
        {ActiveComponent && <ActiveComponent />}
      </div>
      <Footer />
    </div>
  );
}

export default User;
