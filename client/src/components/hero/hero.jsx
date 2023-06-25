import React from "react";
import "../../assets/hero/hero.css";
import rage from "../../assets/img/rage-against.jpg";

function Hero() {
  return (
    <div className="hero--side--wrapper">
      <section className="hero--event">
        <img src={rage} alt="" />
        <div className="hero--event--actions">
          <div className="hero--event--description">
            <h2>Rage Against The Machine</h2>
            <h3>June 9th 2023, Vienna, Austria</h3>
          </div>
          <button>Get Tickets</button>
        </div>
      </section>
    </div>
  );
}

export default Hero;
