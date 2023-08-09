import React, { useState, useRef, useEffect } from "react";

import "../../assets/createEvent/createEvent.css";
import NarrowVertical from "../cards/NarrowVertical";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [location, setLocation] = useState({});
  const [imgName, setImgName] = useState("");

  const [events, setEvents] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);

  const [selectedRelatedEvent, setSelectedRelatedEvent] = useState("");
  const [errObj, setErrObj] = useState({});
  const [megaErr, setMegaErr] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const formDataRef = useRef(new FormData());

  const removeRelatedEvent = (e, event) => {
    e.preventDefault();
    console.log(`Trying to remove event with id ${event}`);
    const filteredArr = relatedEvents.filter((item) => item !== event);
    console.log(filteredArr);
    setRelatedEvents(filteredArr);
  };

  const validateFormData = (e) => {
    let err = {
      eventName: "",
      imagePath: "",
      category: "",
      date: "",
      eventDetails: "",
      ticketPrice: "",
    };

    const validationRules = {
      eventName: (value) => {
        if (value.length > 20 || value === "")
          err.eventName = "Must not be longer than 20 characters";
      },
      imagePath: (value) => {
        if (value === "") err.imagePath = "Must contain image";
        else {
          errObj.imagePath = "";
        }
      },
      category: (value) => {
        if (value === "") err.category = "Must contain category";
        else {
          errObj.category = "";
        }
      },
      relatedEvents: (value) => (err.relatedEvents = ""),
      date: (value) => {
        if (/^\d{2}-\d{2}-\d{4}$/.test(value) || value === "")
          err.date = "Must be valid date";
      },
      eventDetails: (value) => {
        if (value.length < 20 || value === "")
          err.eventDetails = "Must be longer than 20 characters";
      },
      ticketPrice: (value) => {
        if (value == 0 || value === "") err.ticketPrice = "Price cannot be 0";
      },
    };

    for (const item in e) {
      const value = e[item];
      validationRules[item](value);
    }

    return err;
  };

  const objectIsEmpty = (obj) => {
    const valueArr = Object.values(obj);
    return valueArr.every((value) => value === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendForm = async (e) => {
    e.preventDefault();
    if (Object.values(formData).length === 0) {
      setMegaErr("All fields are required");
      return;
    }
    const errors = validateFormData(formData);
    setErrObj(errors);
    console.log(errors);
    if (!objectIsEmpty(errors)) {
      console.log(errObj);
      return;
    }
    if (!imgName) {
      setErrObj((pre) => ({ ...pre, imagePath: "Image is required" }));
      return;
    }
    const locationVals = Object.values(location);
    if (
      locationVals.length === 0 ||
      locationVals[0] === "" ||
      locationVals[1] === ""
    ) {
      setErrObj((pre) => ({ ...pre, location: "Location is required" }));
      return;
    }
    const result = {
      ...formData,
      imagePath: imgName,
      location: location,
      relatedEvents: relatedEvents,
    };

    console.log(result);
    const response = await fetch(
      "http://localhost:10000/api/event/create-event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    );
    const data = await response.json();

    console.log(data);
    if (data.status === "success") {
      navigate("/events");
    }
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(formDataRef.current.get("image"));
    const response = await fetch(
      "http://localhost:10000/api/storage/upload-event",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
        body: formDataRef.current,
      }
    );
    const data = await response.json();
    setImgName(data.file_name);
    console.log(data);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedRelatedEvent(value);
  };

  const addToRelatedEvents = (e) => {
    e.preventDefault();
    if (relatedEvents.length === 0) {
      setRelatedEvents((previous) => [...previous, selectedRelatedEvent]);
      return;
    }
    for (let i = 0; i < relatedEvents.length; i++) {
      if (selectedRelatedEvent === relatedEvents[i]) return;
    }
    setRelatedEvents((previous) => [...previous, selectedRelatedEvent]);
  };

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:10000/api/event");
    const data = await response.json();

    // console.log(data);
    setEvents(data.events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <form className="create--event--component" encType="multipart/form-data">
      <div className="create--event--en--c--d">
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Event Name</label>
          <input
            required
            type="text"
            name="eventName"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          {errObj.eventName && (
            <p className="error-message">{errObj.eventName}</p>
          )}
        </div>
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Category</label>
          {/* <input type="text" /> */}
          <select
            name="category"
            onChange={(e) => {
              handleInputChange(e);
            }}
            id=""
          >
            <option value="">Select category</option>
            <option value="concert">Musical Concert</option>
            <option value="standup">Stand-Up Comedy</option>
          </select>
          {errObj.category && (
            <p className="error-message">{errObj.category}</p>
          )}
        </div>
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Date</label>
          <input
            required
            type="date"
            name="date"
            onChange={(e) => {
              handleInputChange(e);
            }}
            placeholder=""
          />
        </div>
        {errObj.date && <p className="error-message">{errObj.date}</p>}
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
            required
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
          {errObj.imagePath && (
            <p className="error-message">{errObj.imagePath}</p>
          )}
        </div>
        <div className="create--event--ed--tp">
          <label htmlFor="">Event Details</label>
          <textarea
            required
            name="eventDetails"
            onChange={(e) => {
              handleInputChange(e);
            }}
            id=""
          ></textarea>
          {errObj.eventDetails && (
            <p className="error-message">{errObj.eventDetails}</p>
          )}
          <div className="create--event--price--location">
            <div className="creat--event--ticket--price">
              <label htmlFor="">Ticket Price</label>
              <input
                required
                type="number"
                name="ticketPrice"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {errObj.ticketPrice && (
                <p className="error-message">{errObj.ticketPrice}</p>
              )}
            </div>
            <div className="create--event--location">
              <label htmlFor="">Location</label>
              <div className="creat--event--location--inputs">
                <input
                  required
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={handleLocationChange}
                />
                <input
                  required
                  name="country"
                  type="text"
                  placeholder="Country"
                  onChange={handleLocationChange}
                />
              </div>
              {errObj.location && (
                <div>
                  <p className="error-message">Location is required</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {megaErr && (
        <h3 style={{ margin: "20px 0 0 0" }} className="error-message">
          {megaErr}
        </h3>
      )}
      <div className="related--events--create">
        <label htmlFor="">Related Events</label>
        <div className="related--events--create--inputs">
          <select name="relatedEvents" id="" onChange={handleSelectChange}>
            <option value="relatedEvents">Related Event</option>
            {events.map((item, i) => {
              return (
                <option key={i} value={item._id}>
                  {item.eventName}
                </option>
              );
            })}
          </select>
          <button
            onClick={(e) => {
              addToRelatedEvents(e);
            }}
          >
            Add
          </button>
        </div>
        <div className="related--events--narrow--parent">
          {/* <NarrowVertical /> */}
          {relatedEvents.map((event) => {
            return (
              <NarrowVertical
                key={event}
                event={event}
                removeEvent={removeRelatedEvent}
              />
            );
          })}
        </div>
      </div>
      <div className="save--new--event--button--div">
        <button
          onClick={(e) => {
            handleSendForm(e);
          }}
          className="save--new--event--button"
        >
          Save
        </button>
      </div>
      <Footer />
    </form>
  );
}

export default CreateEvent;
