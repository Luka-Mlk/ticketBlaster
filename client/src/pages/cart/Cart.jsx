import React from "react";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import ShoppingCart from "../../components/shoppingCart/ShoppingCart";
import "../../assets/cartPage/cartPage.css";

function Cart() {
  return (
    <div className="cart--component">
      <HeaderLoggedIn />
      <div className="shopping--cart--component--wrapper">
        <ShoppingCart />
      </div>
    </div>
  );
}

export default Cart;
