import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/hero/hero.css";

function Hero({ event }) {
  const [imgSrc, setImgSrc] = useState("");

  const fetchImg = async () => {
    const response = await fetch(
      `http://localhost:10000/api/storage/get-event/${event._id}`
    );
    const imgData = await response.blob();
    setImgSrc(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    fetchImg();
  }, [event]);

  return (
    <div className="hero--side--wrapper">
      <section className="hero--event">
        {imgSrc && (
          <div className="hero--img--wrapper">
            <img src={imgSrc} alt={event.eventName} />
          </div>
        )}
        <div className="hero--event--actions">
          <div className="hero--event--description">
            {event && <h2>{event.eventName}</h2>}
            {event.date && (
              <h3>
                {String(new Date(event.date)).slice(4, 15)},{" "}
                {event.location.city}, {event.location.country}
              </h3>
            )}
          </div>
          <Link className="hero--action" to={`/event/${event._id}`}>
            Get Tickets
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Hero;
