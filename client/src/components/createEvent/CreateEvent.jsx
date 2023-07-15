import React from "react";

import "../../assets/createEvent/createEvent.css";
function CreateEvent() {
  return (
    <form className="create--event--component">
      <div className="create--event--en--c--d">
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Event Name</label>
          <input type="text" />
        </div>
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Category</label>
          {/* <input type="text" /> */}
          <select name="" id="">
            <option value="concert">Musical Concert</option>
            <option value="standup">Stand-Up Comedy</option>
          </select>
        </div>
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Date</label>
          <input type="date" />
        </div>
      </div>
    </form>
  );
}

export default CreateEvent;
