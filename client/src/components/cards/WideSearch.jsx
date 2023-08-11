import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "../../assets/cards/wideSearch/wideSearch.css";
function WideSearch({ item }) {
  const [img, setImg] = useState("");
  const str =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum non atque dolorum ipsa blanditiis incidunt fuga dicta accusantium hic molestiae. Cumque et quibusdam repellendus ab deleniti natus! At veniam tempora omnis eius aut recusandae, illum vitae error dolorem eum optio cupiditate dicta blanditiis quia. Totam, quos saepe mollitia blanditiis modi ullam delectus, omnis nostrum quo, nemo dicta alias ducimus minus. Officia porro nisi exercitationem, consequatur ducimus dolore praesentium voluptatum, sint itaque quidem quos quasi aspernatur ut nam soluta dolorum reprehenderit recusandae quia repellat ipsum ex. Iure, laboriosam delectus quis eligendi dolores libero maiores eaque consequuntur autem aliquid at similique beatae commodi voluptatum, error voluptatem maxime omnis. Saepe magni voluptas dolore aperiam excepturi, tenetur ducimus minus incidunt molestiae, accusamus quis totam.";
  const fetchImg = async () => {
    const response = await fetch(
      `http://localhost:10000/api/storage/get-event/${item._id}`
    );

    const imgData = await response.blob();

    setImg(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    fetchImg();
  }, [item]);
  return (
    <div className="wide--search--component">
      <div>
        <div className="wide--search--img--wrapper">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="wide--search--description">
        <h3>{item.eventName}</h3>
        {/* <p>{item.eventDetails}</p> */}
        <p className="wide--search--eventDetails--location eventDetails ">
          {str.substring(0, 200)}...
        </p>
        <p className="wide--search--eventDetails--location"></p>
        <div>
          <p className="wide--search--date">
            {String(new Date(item.date)).slice(4, 15)}
          </p>
          <p className="wide--search--eventDetails--location">
            {item.location.city}, {item.location.country}
          </p>
        </div>
      </div>
      <div className="wide--search--get--ticket--button">
        {new Date(item.date) > new Date() ? (
          <Link className="" to="/event">
            Get tickets
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default WideSearch;
