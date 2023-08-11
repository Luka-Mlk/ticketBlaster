import React from "react";
import "../../assets/listAllType/listAllType.css";
import NarrowCard from "../cards/NarrowCard";

function ListAllType({ events }) {
  return (
    <div className="list--all--type">
      {events.map((item) => (
        <NarrowCard key={item._id} item={item} />
      ))}
      {/* <NarrowCard />
      <NarrowCard />
      <NarrowCard />
      <NarrowCard /> */}
    </div>
  );
}

export default ListAllType;
