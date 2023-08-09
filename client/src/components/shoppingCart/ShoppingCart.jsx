import React, { useEffect, useState } from "react";
import "../../assets/cart/cart.css";
import WideCard from "../cards/WideCard";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

function ShoppingCart() {
  useEffect(() => {
    getCart(localStorage.getItem("JWT"));
  }, []);

  const [cart, setCart] = useState([]);

  const getCart = async (token) => {
    try {
      const res = await fetch("http://localhost:10000/api/user/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCart(data.cart);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="shopping--cart">
      <h2>Shopping Cart</h2>
      <div className="shopping--cart--inner--wrapper">
        <div className="shopping--cart--items">
          {cart.map((event, i) => {
            return <WideCard key={i} eventInfo={event} />;
          })}
        </div>
        <div className="shopping--cart--actions">
          <Link to="/">Back</Link>
          {cart.length && (
            <Link to="/checkout" state={{ cartData: cart }}>
              Check Out
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
