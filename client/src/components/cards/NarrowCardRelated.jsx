import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/cards/narrow/narrow.css";
import imgPath from "../../assets/img/xzibit.jpg";

function NarrowCardRelated({ item }) {
  const [event, setEvent] = useState({});
  const [imgSrc, setImgSrc] = useState("");

  const fetchData = async () => {
    const eventResponse = await fetch(
      `http://localhost:10000/api/event/${item}`
    );
    const imgRespone = await fetch(
      `http://localhost:10000/api/storage/get-event/${item}`
    );
    const eventData = await eventResponse.json();
    console.log(eventData);
    const imgData = await imgRespone.blob();

    setEvent(eventData.singleEvent);
    setImgSrc(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="narrow--event--card">
      <span id="imgWrapper">
        <img src={imgSrc} alt={event.eventName} />
      </span>
      <div className="narrow--event--description">
        <h3>{event.eventName}</h3>
        <h4>{String(new Date(event.date)).slice(4, 15)}</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
          aliquid veniam aut rem. Culpa soluta repellat corrupti beatae
          incidunt.
        </p>
        <div className="narrow--event--actions">
          {event.location && (
            <p>
              {event.location.city}, {event.location.country}
            </p>
          )}
          {new Date(event.date) > new Date() ? (
            <Link
              to={`/event/${event._id}`}
              className="narrow--event--actions--ticket"
            >
              Get tickets
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default NarrowCardRelated;
