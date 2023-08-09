import React, { useEffect, useState } from "react";

import posterImg from "../../assets/img/xzibit.jpg";
import "../../assets/cards/vNarrowCard/vNarrowCard.css";
function VNarrowCard({ eventInfo, setTotalPriceFunc }) {
  useEffect(() => {
    fetchInfo();
  }, []);

  const [event, setEvent] = useState({});

  useEffect(() => {
    if (event._id) {
      setTotalPriceFunc(event.ticketPrice * eventInfo.numTickets);
    }
  }, [event, setEvent]);

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

  return (
    <div className="v--narrow--card--parent">
      <div className="v--narrow--card">
        <div className="v--narrow--img--wrapper">
          <img src={imgPath} alt="" />
        </div>
        <div className="v--narrow--event--info--wrapper">
          <div className="v--narrow--event--info">
            <h3>{event.eventName}</h3>
            <h4>{event.date}</h4>
            <h5>
              {location.city}, {location.country}
            </h5>
          </div>
          <div className="v--narrow--event--price">
            <p>${event.ticketPrice * eventInfo.numTickets} USD</p>
            <p>
              {eventInfo.numTickets} x ${event.ticketPrice} USD
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default VNarrowCard;
