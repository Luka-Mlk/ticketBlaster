import React from "react";
import { Link } from "react-router-dom";
import NarrowCard from "../../components/cards/NarrowCard";
import Header from "../../components/header/Header";
import ListAllType from "../../components/ListAllType/ListAllType";
import NarrowContentButton from "../../components/ContentButton/ContentButton";

function ListAll() {
  return (
    <div className="events--page">
      <Header />
      <div className="events--page--wrapper">
        <h2>Content Type</h2>
        <ListAllType />
        <NarrowContentButton />
      </div>
    </div>
  );
}

export default ListAll;
