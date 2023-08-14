import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgPathE from "../../assets/img/xzibit.jpg";

import "../../assets/cards/wideAdmin/wideAdmin.css";
function WideAdmin({ event, updateEventsHandler }) {
  const [showPopup, setShowPopup] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const fetchEventImage = async () => {
    const img = await fetch(
      `http://localhost:10000/api/storage/get-event/${event._id}`,
      {
        method: "GET",
      }
    );
    const imgData = await img.blob();
    // console.log(imgData);
    setImgPath(URL.createObjectURL(imgData));
  };

  const handleEventDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:10000/api/event/delete/${event._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);

      updateEventsHandler();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventImage();
  }, []);

  return (
    <div className="wide--event--admin--card--parent">
      <div className="wide--event--admin--card">
        {/* <div className="wide--event--admin--image--wrapper"> */}
        <Link
          to={`/edit-event/${event._id}`}
          className="wide--event--admin--image--wrapper"
        >
          <img src={imgPath} alt="event image" />
        </Link>
        {/* </div> */}
        <div className="wide--event--admin--description">
          <div className="wide--event--admin--description--text--wrapper">
            <div className="wide--event--admin--desctiption--1">
              <h3>{event.eventName}</h3>
              <h4>{String(new Date(event.date)).slice(4, 15)}</h4>
            </div>
            <div className="wide--event--admin--desctiption--2">
              <p>
                {event.location.city}, {event.location.country}
              </p>
            </div>
          </div>
          <div className="wide--event--admin--description--values">
            <button
              onClick={() => {
                setShowPopup(true);
              }}
              className="wide--event--admin--description--values--action"
            >
              Delete Event
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="are--you--sure--delete--post">
            <div className="are--you--sure--delete--post--subdiv">
              <h2>Are you sure?</h2>
              <p>
                You are about to delete an event from the system. Please proceed
                with caution
              </p>
            </div>
            <div className="are--you--sure--delete--post--actions">
              <button
                onClick={() => setShowPopup(false)}
                className="cancel--event--actions"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleEventDelete();
                  setShowPopup(false);
                }}
                className="del--event--actions"
              >
                Delete event
              </button>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default WideAdmin;
