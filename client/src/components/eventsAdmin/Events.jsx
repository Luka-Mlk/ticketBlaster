import React, { useEffect, useState } from "react";
import WideAdmin from "../cards/WideAdmin";
import "../../assets/eventsAdmin/eventsAdmin.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [updateEvents, setUpdateEvents] = useState(false);

  const updateEventsHandler = () => {
    setUpdateEvents(!updateEvents);
    console.log("reFetchCalled");
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:10000/api/event", {
        method: "GET",
      });
      const data = await response.json();
      setEvents(data.events);
      // console.log(data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
    console.log(events);
  }, [, updateEvents]);
  return (
    <div className="events--admin--div">
      {events.map((event, i) => {
        return (
          <WideAdmin
            key={i}
            event={event}
            updateEventsHandler={updateEventsHandler}
          />
        );
      })}
    </div>
  );
}

export default Events;
