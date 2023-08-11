import React, { useEffect, useState } from "react";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import WideSearch from "../../components/cards/wideSearch";

import "../../assets/searchPage/searchResults.css";
function SearchResults() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const { keyword } = useParams();

  const fetchEvents = async () => {
    const response = await fetch(
      `http://localhost:10000/api/event/content/${keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setEvents(data.eventsByContent);
    console.log(data);
  };

  useEffect(() => {
    setToken(localStorage.getItem("JWT"));
    fetchEvents();
  }, [, keyword, setEvents]);

  return (
    <div className="search--page">
      {token ? <HeaderLoggedIn /> : <Header />}
      <div className="search--wrapper">
        <h2 className="search--results--for">Search results for: {keyword}</h2>
        {events.map((event) => {
          return <WideSearch key={event} item={event} />;
        })}
      </div>
    </div>
  );
}

export default SearchResults;
