import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import ListAll from "../pages/listAll/ListAll";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events/:catrgory" element={<ListAll />} />
    </Routes>
  );
}

export default Routing;
