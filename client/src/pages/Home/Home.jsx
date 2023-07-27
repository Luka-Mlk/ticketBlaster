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
  }, []);
  const [authToken, setAuthToken] = useState("");

  const getToken = () => {
    setAuthToken(localStorage.getItem("JWT"));
  };
  return (
    <main>
      {/* <Header /> */}
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
