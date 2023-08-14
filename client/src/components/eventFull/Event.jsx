import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import NarrowCard from "../cards/NarrowCard";
import Footer from "../footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";

import imgPath from "../../assets/img/xzibit.jpg";
import "../../assets/eventFull/eventFull.css";
import NarrowCardRelated from "../cards/NarrowCardRelated";
function Event() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState({});
  const [numTickets, setNumTickets] = useState("");
  const [img, setImg] = useState("");

  const handleDataFetch = async () => {
    const response = await fetch(`http://localhost:10000/api/event/${id}`);
    const data = await response.json();

    console.log(data);
    setEventInfo(data.singleEvent);
    console.log(data.singleEvent);
    fetchImage(id);
  };

  const fetchImage = async (id) => {
    console.log(`http://localhost:10000/api/storage/get-event/${id}`);
    const response = await fetch(
      `http://localhost:10000/api/storage/get-event/${id}`
    );
    const imgData = await response.blob();
    console.log(imgData);
    setImg(URL.createObjectURL(imgData));
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  const handleTicketChange = (e) => {
    setNumTickets(e.target.value);
  };

  const addToCart = async () => {
    const reqBody = {
      numTickets: Number(numTickets),
    };
    const response = await fetch(
      `http://localhost:10000/api/event/${eventInfo._id}/add-to-cart`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      navigate("/cart");
    }
  };

  return (
    <div className="event--component">
      <Header />
      <div className="event--content--wrapper">
        <div className="event--information--div">
          <h2>{eventInfo.eventName}</h2>
          <h3>{String(new Date(eventInfo.date)).slice(4, 15)}</h3>
          {eventInfo.location && (
            <h3>
              {eventInfo.location.city}, {eventInfo.location.country}
            </h3>
          )}
        </div>
        <div className="event--content--div">
          <div className="event--img--wrapper">
            <img src={img} alt="" />
          </div>
          <div className="event--content--description--div">
            <h3>About</h3>
            <div className="event--content--description--main">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Commodi amet suscipit ex obcaecati odio. Labore, totam ipsa,
                fuga quis delectus eum id fugit molestiae dignissimos odio
                officiis aut sequi in.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Commodi amet suscipit ex obcaecati odio. Labore, totam ipsa,
                fuga quis delectus eum id fugit molestiae dignissimos odio
                officiis aut sequi in. Perspiciatis expedita animi voluptatem
                saepe deserunt unde nostrum at repudiandae architecto aliquam
                officia ipsam quod dignissimos, sunt culpa fugit a.
              </p>
            </div>
            <div className="event--content--description--actions--div">
              <div className="event--content--description--ticket--price">
                <h4>Tickets</h4>
                <h5>${eventInfo.ticketPrice} USD</h5>
              </div>
              <div className="event--content--description--buttons">
                <input
                  type="number"
                  placeholder="1"
                  name="numTickets"
                  onChange={handleTicketChange}
                />
                <Link
                  className="event--content--description--buttons--add--to--cart"
                  onClick={(e) => {
                    console.log(eventInfo);
                    addToCart();
                  }}
                >
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="event--related--acts--wrapper">
          <h3>Related Acts</h3>
          {eventInfo.relatedEvents && eventInfo.relatedEvents.length > 0 && (
            <div className="event--related--acts--div">
              {eventInfo.relatedEvents.map((item) => (
                <NarrowCardRelated key={item} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Event;
