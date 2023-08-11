import React, { useEffect, useState } from "react";
import imgPath from "../../assets/img/xzibit.jpg";
import "../../assets/cards/wide/wide.css";
import { Link } from "react-router-dom";
function WideCard({ eventInfo }) {
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState({});
  const [imgPath, setImgPath] = useState("");

  const fetchInfo = async () => {
    try {
      const path = `http://localhost:10000/api/event/${eventInfo.event}`;
      const res = await fetch(path, {
        method: "GET",
      });
      const data = await res.json();
      // console.log(data);
      const dataParsed = data.singleEvent;
      // console.log(dataParsed._id);
      // console.log(dataParsed);
      setEvent(dataParsed);
      setLocation(dataParsed.location);
      const img = await fetch(
        `http://localhost:10000/api/storage/get-event/${dataParsed._id}`,
        {
          method: "GET",
        }
      );
      const imgData = await img.blob();
      // console.log(imgData);
      setImgPath(URL.createObjectURL(imgData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div className="wide--event--card--parent">
      <div className="wide--event--card">
        <div className="wide--event--image--wrapper">
          <img src={imgPath} alt="event image" />
        </div>
        <div className="wide--event--description">
          <div className="wide--event--description--text">
            <h3>{event.eventName}</h3>
            <h4>{String(new Date(event.date)).slice(4, 15)}</h4>
            <p>
              {location.city}, {location.country}
            </p>
          </div>
          <div className="wide--event--description--values">
            <h3>${event.ticketPrice} USD</h3>
            <h4>
              {eventInfo.numTickets} x $
              {eventInfo.numTickets * event.ticketPrice} USD
            </h4>
            <Link className="wide--event--description--values--action">
              Remove
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default WideCard;
