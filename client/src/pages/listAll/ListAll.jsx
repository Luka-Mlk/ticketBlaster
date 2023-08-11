import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ListAllType from "../../components/ListAllType/ListAllType";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
function ListAll() {
  const [authToken, setAuthToken] = useState("");
  const [events, setEvents] = useState([]);

  const { pathname } = useLocation();
  let header = "";
  if (pathname === "/events/concert") {
    header = "Musical Concert";
  }
  if (pathname === "/events/standup") {
    header = "Stand-up Comedy";
  }

  useEffect(() => {
    getToken();
    fetchEvents();
  }, [pathname]);

  const fetchEvents = async () => {
    const category = pathname.split("/");
    const response = await fetch(
      `http://localhost:10000/api/event/category/${category[2]}`
    );
    const data = await response.json();
    const eventsArr = data.eventsByCategory;
    setEvents(eventsArr);
    // console.log(eventsArr);
  };

  const getToken = () => {
    setAuthToken(localStorage.getItem("JWT"));
  };

  return (
    <div className="events--page">
      {authToken ? <HeaderLoggedIn /> : <Header />}
      <div className="events--page--wrapper">
        <h2>{header}</h2>
        <ListAllType events={events} />
        <ContentButton />
      </div>
      <Footer />
    </div>
  );
}

export default ListAll;
