import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import imgPath from "../../assets/img/xzibit.jpg";
import tbBlack from "../../assets/img/ticketBlasterBlack.svg";
import "../../assets/cards/narrow/narrow.css";
function NarrowCardHistory() {
  const [showPopup, setShowPopup] = useState(false);
  const [qrCodeImg, setQrCodeImg] = useState("");

  const fetchQr = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Event`
      );
      const data = await response.blob();
      const imgUrl = URL.createObjectURL(data);
      setQrCodeImg(imgUrl);
    } catch (err) {
      console.error(`Failed to fetch qr ${err}`);
    }
  };

  useEffect(() => {
    fetchQr();
  }, [showPopup]);

  return (
    <div className="narrow--event--card">
      <span id="imgWrapper">
        <img src={imgPath} alt="card image" />
      </span>
      <div className="narrow--event--description">
        <h3>Event</h3>
        <h4>June 9th, 2023</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
          aliquid veniam aut rem. Culpa soluta repellat corrupti beatae
          incidunt.
        </p>
        <div className="narrow--event--actions">
          <p>Zagreb, Croatia</p>
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
              <h2>Event</h2>
              <h3>Date</h3>
              <h4>Location</h4>
            </div>
            <img src={qrCodeImg} className="QR" alt="QR Code" />
          </div>
        </div>
      )}
    </div>
  );
}

export default NarrowCardHistory;
