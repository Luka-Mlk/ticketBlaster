import React from "react";
import "../../assets/cart/cart.css";
import WideCard from "../cards/WideCard";
import { Link } from "react-router-dom";

function ShoppingCart() {
  return (
    <div className="shopping--cart">
      <h2>Shopping Cart</h2>
      <div className="shopping--cart--inner--wrapper">
        <div className="shopping--cart--items">
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <WideCard />
          <hr />
        </div>
        <div className="shopping--cart--actions">
          <Link>Back</Link>
          <Link>Check Out</Link>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
