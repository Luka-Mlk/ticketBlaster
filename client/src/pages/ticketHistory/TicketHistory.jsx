import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import TicketHistory from "../../components/ticketHistory/TicketHistory";
import Footer from "../../components/footer/Footer";

import "../../assets/userPage/userPage.css";
// load one component that within itself contains another dynamicaly changing component depending on what button is clicked
function TicketHistoryPage() {
  const [authToken, setAuthToken] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getToken();
  }, []);

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
            <h2>Ticket History</h2>
          </div>
          <div className="user--component--navigation">
            {decodedToken.admin && <Link to="/events">Events</Link>}
            {decodedToken.admin && <Link to="/manage-users">Users</Link>}
            <Link to="/ticket-history" id="active">
              Ticket History
            </Link>
            <Link to="/user">User Details</Link>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
        <TicketHistory />
      </div>
      <Footer />
    </div>
  );
}

export default TicketHistoryPage;
