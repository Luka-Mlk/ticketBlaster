import { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Hero from "./components/hero/hero";
import NarrowCard from "./components/cards/NarrowCard";
import NarrowContentButton from "./assets/buttons/narrow/NarrowContentButton";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <div className="events--wrapper">
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Musical Concerts</h3>
          <NarrowCard />
          <NarrowCard />
          <NarrowContentButton />
        </div>
        <div className="events--subwrapper">
          <h3 className="event--list--descriptors">Stand-up Comedy</h3>
          <NarrowCard />
          <NarrowCard />
          <NarrowContentButton />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
