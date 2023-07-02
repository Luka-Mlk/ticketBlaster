import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import ListAllType from "../../components/ListAllType/ListAllType";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";

function ListAll() {
  return (
    <div className="events--page">
      <Header />
      <div className="events--page--wrapper">
        <h2>Content Type</h2>
        <ListAllType />
        <ContentButton />
      </div>
      <Footer />
    </div>
  );
}

export default ListAll;
