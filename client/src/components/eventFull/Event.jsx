import React from "react";
import Header from "../header/Header";

import imgPath from "../../assets/img/xzibit.jpg";
import "../../assets/eventFull/eventFull.css";
import NarrowCard from "../cards/NarrowCard";
import Footer from "../footer/Footer";
function Event() {
  return (
    <div className="event--component">
      <Header />
      <div className="event--content--wrapper">
        <div className="event--information--div">
          <h2>Event</h2>
          <h3>Date</h3>
          <h3>Location</h3>
        </div>
        <div className="event--content--div">
          <div className="event--img--wrapper">
            <img src={imgPath} alt="" />
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
                <h5>$60.00 USD</h5>
              </div>
              <div className="event--content--description--buttons">
                <input type="number" placeholder="1" />
                <button>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="event--related--acts--wrapper">
          <h3>Related Acts</h3>
          <div className="event--related--acts--div">
            <NarrowCard />
            <NarrowCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Event;
