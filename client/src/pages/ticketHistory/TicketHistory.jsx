import React from "react";
import { Link } from "react-router-dom";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import TicketHistory from "../../components/ticketHistory/TicketHistory";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function TicketHistoryPage() {
  return (
    <div className="user--page">
      <HeaderLoggedIn />
      <div className="user--component--wrapper">
        <div className="user--component--heading">
          <div className="user--component--heading--div">
            <h2>Ticket History</h2>
          </div>
          <div className="user--component--navigation">
            <Link to="/events">Events</Link>
            <Link to="/manage-users">Users</Link>
            <Link to="/ticket-history" id="active">
              Ticket History
            </Link>
            <Link to="/user">User Details</Link>
            <Link>Log Out</Link>
          </div>
        </div>
        <TicketHistory />
      </div>
      <Footer />
    </div>
  );
}

export default TicketHistoryPage;
