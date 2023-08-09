import React, { useEffect, useState } from "react";
import NarrowCardHistory from "../cards/NarrowCardHistory";

import "../../assets/ticketHistory/ticketHistory.css";
function TicketHistory() {
  useEffect(() => {
    getCart(localStorage.getItem("JWT"));
  }, []);

  const [cart, setCart] = useState([]);

  const getCart = async (token) => {
    // const res = await fetch("http://localhost:10000/api/user/history", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // const data = await res.json();
    // setCart(data.cart);
    // console.log(data);
  };
  return (
    <div className="user--ticket--history">
      {/* <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory /> */}
      {cart.map((event, i) => {
        return <NarrowCardHistory id={event} key={i} />;
      })}
    </div>
  );
}

export default TicketHistory;
