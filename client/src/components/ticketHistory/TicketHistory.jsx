import React, { useEffect, useState } from "react";
import NarrowCardHistory from "../cards/NarrowCardHistory";

import "../../assets/ticketHistory/ticketHistory.css";
function TicketHistory() {
  const [cart, setCart] = useState([]);
  const fetchHistory = async () => {
    try {
      const history = await fetch(
        "http://localhost:10000/api/ecommerce/history",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const historyData = await history.json();

      setCart(historyData.history);
      console.log(historyData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="user--ticket--history">
      {/* <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory /> */}
      {cart.map((event) => {
        return <NarrowCardHistory id={event} key={event} />;
      })}
    </div>
  );
}

export default TicketHistory;
