import React from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import Users from "../../components/usersAdmin/Users";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function ManageUsers() {
  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>Users</h2>
          </div>
          <div className="user--component--navigation">
            <Link to="/events">Events</Link>
            <Link to="/manage-users" id="active">
              Users
            </Link>
            <Link to="/ticket-history">Ticket History</Link>
            <Link to="/user">User Details</Link>
            <Link>Log Out</Link>
          </div>
        </div>
        <Users />
      </div>
      <Footer />
    </div>
  );
}

export default ManageUsers;
