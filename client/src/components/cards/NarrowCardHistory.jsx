import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import imgPath from "../../assets/img/xzibit.jpg";
import tbBlack from "../../assets/img/ticketBlasterBlack.svg";
import "../../assets/cards/narrow/narrow.css";
function NarrowCardHistory({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeImg, setQrCodeImg] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState({});

  const fetchQr = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event.eventName}`
      );
      const data = await response.blob();
      const imgUrl = URL.createObjectURL(data);
      setQrCodeImg(imgUrl);
    } catch (err) {
      console.error(`Failed to fetch qr ${err}`);
    }
  };

  const fetchInfo = async () => {
    try {
      const path = `http://localhost:10000/api/event/${id.event}`;
      const res = await fetch(path, {
        method: "GET",
      });
      const data = await res.json();
      const dataParsed = data.singleEvent;
      // console.log(dataParsed._id);
      console.log(dataParsed);
      setEvent(dataParsed);
      setLocation(dataParsed.location);
      const img = await fetch(
        `http://localhost:10000/api/storage/get-event/${dataParsed._id}`,
        {
          method: "GET",
        }
      );
      const imgData = await img.blob();
      console.log(imgData);
      setImgPath(URL.createObjectURL(imgData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    fetchQr();
  }, [showPopup]);

  return (
    <div className="narrow--event--card">
      <span id="imgWrapper">
        {/* <img src={imgPath} alt="card image" /> */}
        <img src={imgPath} alt={event.eventName} />
      </span>
      <div className="narrow--event--description">
        <h3>{event.eventName}</h3>
        <h4>{event.date}</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
          aliquid veniam aut rem. Culpa soluta repellat corrupti beatae
          incidunt.
          {/* {event.eventDetails} MUST BE 160 WORDS */}
        </p>
        <div className="narrow--event--actions">
          <p>
            {location.city}, {location.country}
          </p>
          <Link
            onClick={() => {
              setShowPopup(true);
            }}
            className="narrow--event--actions--ticket print"
          >
            Print
          </Link>
        </div>
      </div>
      {qrCodeImg && showPopup && (
        <div
          className="qr--wrapper"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <img
            src={tbBlack}
            className="tickerBlaster--black"
            alt="ticketBlaster"
          />
          <div className="imgWrapper--qr">
            <img src={imgPath} alt="event img" />
          </div>
          <div className="qr--event--details">
            <div className="qr--event--details--idp">
              <h2>{event.eventName}</h2>
              <h3>{event.date}</h3>
              <h4>
                {location.city}, {location.country}
              </h4>
            </div>
            <img src={qrCodeImg} className="QR" alt="QR Code" />
          </div>
        </div>
      )}
    </div>
  );
}

export default NarrowCardHistory;
