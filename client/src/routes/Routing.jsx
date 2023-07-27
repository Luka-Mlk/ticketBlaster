import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import ListAll from "../pages/listAll/ListAll";
import Register from "../pages/register/Register";
import Cart from "../pages/cart/Cart";
import User from "../pages/user/User";
import Event from "../components/eventFull/Event";
import TicketHistoryPage from "../pages/ticketHistory/TicketHistory";
import ManageUsers from "../pages/manageUsers/ManageUsers";
import Events from "../pages/eventsUser/Events";
import CreateEventPage from "../pages/createEvent/CreateEventPage";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/:catergory" element={<ListAll />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/user" element={<User />} />
      <Route path="/event" element={<Event />} />
      <Route path="/ticket-history" element={<TicketHistoryPage />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEventPage />} />
    </Routes>
  );
}

export default Routing;
