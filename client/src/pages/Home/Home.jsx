import React from "react";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/hero";
import NarrowCard from "../../components/cards/NarrowCard";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <main>
      <Header />
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
