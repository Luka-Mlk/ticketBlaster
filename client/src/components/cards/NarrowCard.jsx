import React from "react";
import "../../assets/cards/narrow/narrow.css";
import imgPath from "../../assets/img/xzibit.jpg";

function NarrowCard() {
  return (
    <div className="narrow--event--card">
      <img src={imgPath} alt="card image" />
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
          <button>Get tickets</button>
        </div>
      </div>
    </div>
  );
}

export default NarrowCard;
