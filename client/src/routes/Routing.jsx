import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import ListAll from "../pages/listAll/ListAll";
import Register from "../pages/register/Register";
import Cart from "../pages/cart/Cart";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:catergory" element={<ListAll />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
