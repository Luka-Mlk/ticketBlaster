import React from "react";
import imgPath from "../../assets/img/rage-against.jpg";

import "../../assets/narrowVertical/narrowVertical.css";
function NarrowVertical() {
  return (
    <div className="narror--vertical--card">
      <div className="narrow--vertical--img--wrapper">
        <img src={imgPath} alt="" />
      </div>
      <div className="narrow--vertcal--content--and--actions">
        <div className="narrow--verticall--content">
          <h3>Event</h3>
          <h4>Date</h4>
          <h5>Location</h5>
        </div>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default NarrowVertical;
