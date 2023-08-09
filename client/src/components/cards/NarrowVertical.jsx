import React, { useEffect, useState } from "react";
import imgPath from "../../assets/img/rage-against.jpg";

import "../../assets/narrowVertical/narrowVertical.css";
function NarrowVertical({ event, removeEvent }) {
  const [eventInfo, setEventInfo] = useState({});
  const [eventImg, setEventImg] = useState("");

  const fetchEvents = async () => {
    const response = await fetch(`http://localhost:10000/api/event/${event}`);
    const data = await response.json();
    setEventInfo(data.singleEvent);
    const image = await fetch(
      `http://localhost:10000/api/storage/get-event/${event}`
    );
    const imgData = await image.blob();
    setEventImg(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="narror--vertical--card">
      <div className="narrow--vertical--img--wrapper">
        <img src={eventImg} alt="" />
      </div>
      <div className="narrow--vertcal--content--and--actions">
        <div className="narrow--verticall--content">
          <h3>{eventInfo.eventName}</h3>
          <h4>{eventInfo.date}</h4>
          {eventInfo.location && (
            <h5>
              {eventInfo.location.city}, {eventInfo.location.country}{" "}
            </h5>
          )}
        </div>
        <button
          onClick={(e) => {
            removeEvent(e, event);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default NarrowVertical;
