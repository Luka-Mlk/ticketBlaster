import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import ListAll from "../pages/listAll/ListAll";
import Register from "../pages/register/Register";
import Cart from "../pages/cart/Cart";
import User from "../pages/user/User";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:catergory" element={<ListAll />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default Routing;
