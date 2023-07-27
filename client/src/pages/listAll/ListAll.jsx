import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ListAllType from "../../components/ListAllType/ListAllType";
import ContentButton from "../../components/ContentButton/ContentButton";
import Footer from "../../components/footer/Footer";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
function ListAll() {
  useEffect(() => {
    getToken();
  }, []);

  const [authToken, setAuthToken] = useState("");

  const { pathname } = useLocation();
  let header = "";
  if (pathname === "/events/concert") {
    header = "Musical Concert";
  }
  if (pathname === "/events/standup") {
    header = "Stand-up Comedy";
  }

  const getToken = () => {
    setAuthToken(localStorage.getItem("JWT"));
  };
  return (
    <div className="events--page">
      {authToken ? <HeaderLoggedIn /> : <Header />}
      <div className="events--page--wrapper">
        <h2>{header}</h2>
        <ListAllType />
        <ContentButton />
      </div>
      <Footer />
    </div>
  );
}

export default ListAll;
