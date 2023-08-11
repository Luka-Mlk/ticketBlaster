import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import NarrowCard from "../../components/cards/NarrowCard";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";

function Home() {
  const [authToken, setAuthToken] = useState("");
  const [musicEvents, setMusicEvents] = useState([]);
  const [standupEvents, setStandupEvents] = useState([]);
  const [visibleItems, setVisibleItems] = useState(3);
  const [heroEvent, setHeroEvent] = useState({});

  const selectMostRecentEvent = (events) => {
    const currentDate = new Date();

    const futureEvents = events.filter(
      (event) => new Date(event.date) > currentDate
    );

    if (futureEvents.length === 0) {
      console.log("No future events found.");
      return null;
    }

    const nearestDate = futureEvents.reduce((closest, event) => {
      const eventDate = new Date(event.date);
      const closestDate = new Date(closest.date);

      return eventDate < closestDate ? event : closest;
    });

    return nearestDate;
  };

  // const handleLoadMoreItems = () => {
  //   setVisibleItems((prev) => prev + 3);
  // };

  useEffect(() => {
    getToken();
    fetchData();
  }, []);

  const getToken = () => {
    setAuthToken(localStorage.getItem("JWT"));
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:10000/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
    const allItems = data.events;
    // console.log(selectMostRecentEvent(allItems));
    setHeroEvent(selectMostRecentEvent(allItems));
    const musicalConcerts = allItems.filter(
      (item) => item.category === "concert"
    );
    setMusicEvents(musicalConcerts);
    const standup = allItems.filter((item) => item.category === "standup");
    setStandupEvents(standup);
  };

  return (
    <main>
      {authToken ? <HeaderLoggedIn /> : <Header />}
      {heroEvent && <Hero event={heroEvent} />}
      <div className="events--wrapper">
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Musical Concerts</h3>
          {musicEvents.slice(0, visibleItems).map((item) => (
            <NarrowCard key={item._id} item={item} />
          ))}
          <ContentButton
            content={"See all musical concerts"}
            location={"/events/concert"}
          />
        </div>
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Stand-up Comedy</h3>
          {standupEvents.slice(0, visibleItems).map((item) => {
            return <NarrowCard key={item._id} item={item} />;
          })}
          <ContentButton
            content={"See all standup events"}
            location={"/events/standup"}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
