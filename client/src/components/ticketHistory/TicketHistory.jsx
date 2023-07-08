import React from "react";
import NarrowCardHistory from "../cards/NarrowCardHistory";

import "../../assets/ticketHistory/ticketHistory.css";
function TicketHistory() {
  return (
    <div className="user--ticket--history">
      <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory />
      <NarrowCardHistory />
    </div>
  );
}

export default TicketHistory;
