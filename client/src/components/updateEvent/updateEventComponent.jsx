import React, { useState, useRef, useEffect } from "react";

import "../../assets/createEvent/createEvent.css";
import NarrowVertical from "../cards/NarrowVertical";
import Footer from "../footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
function UpdateEventComponent() {
  const { id } = useParams();
  const [singleEvent, setSingleEvents] = useState({
    eventName: "",
    date: "",
    location: {
      city: "",
      country: "",
    },
    relatedEvents: [],
    eventDetails: "",
    category: "",
    imagePath: "",
    ticketPrice: "",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [eventDetails, setEventDetails] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [location, setLocation] = useState({ city: "", country: "" });

  const [events, setEvents] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);

  const [selectedRelatedEvent, setSelectedRelatedEvent] = useState("");
  const [errObj, setErrObj] = useState({});
  const [megaErr, setMegaErr] = useState("");
  const formDataRef = useRef(new FormData());

  const EventFetch = async () => {
    const response = await fetch(`http://localhost:10000/api/event/${id}`);
    const data = await response.json();
    console.log(data);
    const imgResponse = await fetch(
      `http://localhost:10000/api/storage/get-event/${id}`
    );
    const imgData = await imgResponse.blob();
    setImgSrc(URL.createObjectURL(imgData));
    setSingleEvents(data.singleEvent);
    setEventName(data.singleEvent.eventName);
    setEventCategory(data.singleEvent.category);
    setLocation(data.singleEvent.location);
    setEventDetails(data.singleEvent.eventDetails);
    setTicketPrice(data.singleEvent.ticketPrice);
  };

  const fetchEvents = async () => {
    const response = await fetch("http://localhost:10000/api/event");
    const data = await response.json();

    // console.log(data);
    setEvents(data.events);
  };

  useEffect(() => {
    EventFetch();
    fetchEvents();
  }, []);

  const validateName = (e) => {
    if (e.length > 20) return;
  };

  const validateFormData = (e) => {
    let err = {
      eventName:
        e.eventName > 20 ? "Must not be longer than 20 characters" : "",
      date: e.eventDate === 0 ? "Must be a valid date" : "",
      eventDetails:
        e.eventDetails.length < 20 ? "Must be longer than 20 characters" : "",
      ticketPrice: e.ticketPrice == 0 ? "Price cannot be 0" : "",
    };

    return err;
  };

  const objectIsEmpty = (obj) => {
    const valueArr = Object.values(obj);
    return valueArr.every((value) => value === "");
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   console.log(formData);
  // };

  const handleEventName = (e) => {
    setEventName(e.target.value);
  };

  const handleCategory = (e) => {
    setEventCategory(e.target.value);
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

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

  const handleDetails = (e) => {
    setEventDetails(e.target.value);
  };

  const handlePrice = (e) => {
    setTicketPrice(e.target.value);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
    console.log(location);
  };

  // const formData = new FormData();

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
    console.log(relatedEvents);
  };

  const removeRelatedEvent = (e, event) => {
    e.preventDefault();
    console.log(`Trying to remove event with id ${event}`);
    const filteredArr = relatedEvents.filter((item) => item !== event);
    console.log(filteredArr);
    setRelatedEvents(filteredArr);
  };

  const handleSendForm = async (e) => {
    e.preventDefault();
    const formVals = {
      eventName,
      eventCategory,
      eventDate: eventDate || singleEvent.date,
      imagePath: imgName || singleEvent.imagePath,
      eventDetails,
      ticketPrice: Number(ticketPrice) || "",
      location: {
        city: location.city || singleEvent.location.city,
        country: location.country || singleEvent.location.country,
      },
      relatedEvents:
        relatedEvents.length > 0 ? relatedEvents : singleEvent.relatedEvents,
    };
    console.log(formVals);
    const errors = validateFormData(formVals);
    console.log(errors);
    setErrObj(errors);
    if (!objectIsEmpty(errors)) {
      console.log(errObj);
      return;
    }

    const response = await fetch(
      `http://localhost:10000/api/event/${singleEvent._id}/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formVals),
      }
    );
    const data = await response.json();

    console.log(data);
    if (data.status === "success") {
      navigate("/events");
    }
  };

  return (
    <form className="create--event--component" encType="multipart/form-data">
      <div className="create--event--en--c--d">
        <div className="create--event--en--c--d--input--field">
          <label htmlFor="">Event Name</label>
          <input
            required
            type="text"
            name="eventName"
            value={eventName}
            onChange={(e) => {
              handleEventName(e);
              console.log(eventName);
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
            value={eventCategory}
            onChange={(e) => {
              handleCategory(e);
            }}
            id=""
          >
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
            value={eventDate}
            onChange={(e) => {
              handleDateChange(e);
            }}
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
              handleDetails(e);
            }}
            id=""
            value={eventDetails}
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
                  handlePrice(e);
                }}
                value={ticketPrice}
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
                  value={location.city}
                  placeholder="City"
                  onChange={handleLocationChange}
                />
                <input
                  required
                  name="country"
                  type="text"
                  value={location.country}
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

export default UpdateEventComponent;
