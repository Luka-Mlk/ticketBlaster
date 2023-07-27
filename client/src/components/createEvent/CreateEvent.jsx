import React, { useState, useRef } from "react";

import "../../assets/createEvent/createEvent.css";
import NarrowVertical from "../cards/NarrowVertical";
function CreateEvent() {
  const [imgSrc, setImgSrc] = useState(null);
  // const [imgFile, setImgFile] = useState(undefined);
  const formDataRef = useRef(new FormData());
  // const formData = new FormData();

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      formDataRef.current.set("image", file);
      console.log(file);
      console.log(formDataRef.current.get("image"));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // console.log(e.dataTransfer);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      formDataRef.current.set("image", file);
      console.log(formDataRef.current.get("image"));
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(formDataRef.current.get("image"));
    fetch("http://localhost:10000/api/storage/upload-event", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ikx1a2EgTWlsaWsiLCJlbWFpbCI6Imx1a2EubWlsaWsxQGdtYWlsLmNvbSIsImlkIjoiNjQ5MzNiY2JiMDU0NjU1OGNiMDljMzhhIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4NzQ2NDIyN30.GpwkTN853FPpC1I6kN8t-uY_jlKOK3yWLyoAmVRuvJ0",
      },
      body: formDataRef.current,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <form className="create--event--component" encType="multipart/form-data">
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
          <input type="date" placeholder="" />
        </div>
      </div>
      <div className="create--event--u-ed--tp">
        <div className="create--event--art">
          <button
            htmlFor="fileIn"
            className="create--event--upload--art--button"
            onClick={handleUpload}
          >
            Upload Event Art
          </button>
          <input
            className="create--event--upload--art"
            type="file"
            id="fileIn"
            onChange={handleFileChange}
          />
          <label htmlFor="fileIn" onDragOver={handleDrag} onDrop={handleDrop}>
            {imgSrc ? (
              <div className="upload--img--wrapper">
                <img src={imgSrc} alt="" />
              </div>
            ) : (
              <div className="file--input--fake--button">
                <p>Event Photo</p>
              </div>
            )}
          </label>
        </div>
        <div className="create--event--ed--tp">
          <label htmlFor="">Event Details</label>
          <textarea name="" id=""></textarea>
          <div className="create--event--tp">
            <label htmlFor="">Ticket Price</label>
            <input type="number" />
          </div>
        </div>
      </div>
      <div className="related--events--create">
        <label htmlFor="">Related Events</label>
        <div className="related--events--create--inputs">
          <select name="" id="">
            <option value="">Event</option>
            <option value="">Event</option>
            <option value="">Event</option>
          </select>
          <button>Add</button>
        </div>
        <div className="related--events--narrow--parent">
          <NarrowVertical />
        </div>
      </div>
    </form>
  );
}

export default CreateEvent;
