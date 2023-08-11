import "../../assets/header/header.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ticketBlasterLogo from "../../assets/img/ticketBlaster.svg";

function HeaderLoggedIn() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchVal(e.target.value);
    // console.log(searchVal);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    navigate(`/events/search/${searchVal}`);
    // const response = await fetch(
    //   `http://localhost:10000/api/event/content/${searchVal}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const data = await response.json();

    // console.log(data);
  };

  return (
    <header>
      <div className="header--side--wrap">
        <div className="header--left--items">
          <Link to="/">
            <img src={ticketBlasterLogo} alt="ticket blaster logo" />
          </Link>
          <Link to="/events/concert">Musical Concerts</Link>
          <Link to="/events/standup">Stand-up Comedy</Link>
        </div>
        <div className="header--right--items">
          <form onSubmit={handleFormSubmission}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchInputChange}
            />
          </form>
          <Link id="cart--icon" to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
          <Link id="profile" to="/user">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderLoggedIn;
