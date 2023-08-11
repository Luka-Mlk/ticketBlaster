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
import Checkout from "../pages/checkout/Checkout";
import SearchResults from "../pages/searchResults/SearchResults";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/*Done*/}
      <Route path="/login" element={<Login />} /> {/*Done*/}
      <Route path="/register" element={<Register />} /> {/*Done*/}
      <Route path="/events/:catergory" element={<ListAll />} /> {/*Done*/}
      <Route path="/events/search/:keyword" element={<SearchResults />} />
      <Route path="/event" element={<Event />} />
      <Route path="/cart" element={<Cart />} /> {/*Done*/}
      <Route path="/checkout" element={<Checkout />} /> {/*Done*/}
      <Route path="/user" element={<User />} /> {/*Done*/}
      <Route path="/ticket-history" element={<TicketHistoryPage />} />
      <Route path="/manage-users" element={<ManageUsers />} /> {/*Done*/}
      <Route path="/events" element={<Events />} /> {/*Done*/}
      <Route path="/create-event" element={<CreateEventPage />} /> {/*Done*/}
    </Routes>
  );
}

export default Routing;
