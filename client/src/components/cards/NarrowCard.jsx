import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/cards/narrow/narrow.css";
import imgPath from "../../assets/img/xzibit.jpg";

function NarrowCard({ item }) {
  const [imgSrc, setImgSrc] = useState("");

  const fetchImg = async () => {
    const response = await fetch(
      `http://localhost:10000/api/storage/get-event/${item._id}`
    );
    const imgData = await response.blob();
    setImgSrc(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    fetchImg();
  }, []);
  return (
    <div className="narrow--event--card">
      <span id="imgWrapper">
        <img src={imgSrc} alt={item.eventName} />
      </span>
      <div className="narrow--event--description">
        <h3>{item.eventName}</h3>
        <h4>{String(new Date(item.date)).slice(4, 15)}</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum cum
          aliquid veniam aut rem. Culpa soluta repellat corrupti beatae
          incidunt.
        </p>
        <div className="narrow--event--actions">
          <p>
            {item.location.city}, {item.location.country}
          </p>
          {new Date(item.date) > new Date() ? (
            <Link className="narrow--event--actions--ticket" to="/event">
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

export default NarrowCard;
