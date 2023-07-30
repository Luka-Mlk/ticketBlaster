import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import UserDetails from "../../components/userDetails/UserDetails";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function User() {
  // const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  const getToken = () => {
    if (!localStorage.getItem("JWT")) {
      return navigate("/");
    }
    // setAuthToken(localStorage.getItem("JWT"));
  };
  const token = localStorage.getItem("JWT");
  const decodedToken = jwt_decode(token);

  const handleLogOut = () => {
    localStorage.clear("JWT");
    navigate("/");
  };
  // const componentMap = {
  //   Events,
  //   Users,
  //   TicketHistory,
  //   UserDetails,
  //   CreateEvent,
  // };

  // const headerMap = {
  //   Events: "Events",
  //   Users: "Users",
  //   TicketHistory: "Ticket History",
  //   UserDetails: "User Details",
  //   CreateEvent: "Events",
  // };

  // const [activeComponent, setActiveComponent] = useState("UserDetails");

  // const handleComponentChange = (componentName) => {
  //   setActiveComponent(componentName);
  // };

  // const ActiveComponent = componentMap[activeComponent];
  // const headerValue = headerMap[activeComponent];

  useEffect(() => {
    getToken();
    if (!localStorage.getItem("JWT")) return navigate("/");
  }, []);
  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>User Details</h2>
            {/* {activeComponent === "Events" ? (
              <button
                onClick={() => handleComponentChange("CreateEvent")}
                className="create--event--button"
              >
                Create Event
              </button>
            ) : (
              ""
            )} */}
          </div>
          <div className="user--component--navigation">
            {decodedToken.admin && (
              <Link
                // id={activeComponent === "Events" ? "active" : ""}
                // onClick={() => handleComponentChange("Events")}
                to="/events"
              >
                Events
              </Link>
            )}
            {decodedToken.admin && (
              <Link
                // id={activeComponent === "Users" ? "active" : ""}
                // onClick={() => handleComponentChange("Users")}
                to="/manage-users"
              >
                Users
              </Link>
            )}
            <Link
              // id={activeComponent === "TicketHistory" ? "active" : ""}
              // onClick={() => handleComponentChange("TicketHistory")}
              to="/ticket-history"
            >
              Ticket History
            </Link>
            <Link
              // id={activeComponent === "UserDetails" ? "active" : ""}
              // onClick={() => handleComponentChange("UserDetails")}
              to="/user"
              id="active"
            >
              User Details
            </Link>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
        {/* {ActiveComponent && <ActiveComponent />} */}
        <UserDetails />
      </div>
      <Footer />
    </div>
  );
}

export default User;
