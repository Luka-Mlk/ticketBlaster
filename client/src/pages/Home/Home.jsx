import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/hero";
import NarrowCard from "../../components/cards/NarrowCard";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";

function Home() {
  useEffect(() => {
    getToken();
    fetchData();
  }, []);
  const [authToken, setAuthToken] = useState("");

  const getToken = () => {
    setAuthToken(localStorage.getItem("JWT"));
    console.log("Token");
  };

  const fetchData = async () => {
    const response = await fetch("http://localhost:10000/api/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <main>
      {authToken ? <HeaderLoggedIn /> : <Header />}
      <Hero />
      <div className="events--wrapper">
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Musical Concerts</h3>
          <NarrowCard />
          <NarrowCard />
          <ContentButton />
        </div>
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Stand-up Comedy</h3>
          <NarrowCard />
          <NarrowCard />
          <ContentButton />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
