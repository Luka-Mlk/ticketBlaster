import React, { useState } from "react";
import HeaderLoggedIn from "../../components/header/HeaderLoggedIn";
import { Link, useLocation } from "react-router-dom";

import "../../assets/checkoutPage/checkoutPage.css";
import VNarrowCard from "../../components/cards/VNarrowCard";
function Checkout() {
  const [totalPrice, setTotalPrice] = useState(0);
  const setTotalPriceFunc = (calculatedTotal) => {
    setTotalPrice((prevTotal) => {
      console.log(prevTotal + calculatedTotal);
      return prevTotal + calculatedTotal;
    });
  };
  const location = useLocation();
  const { cartData } = location.state;
  return (
    <div className="checkout--page">
      <HeaderLoggedIn />
      <div className="checkout--page--wrapper">
        <h2>Checkout</h2>
        <div className="sub--wrapper">
          <div className="component--wrapper">
            <div className="checkout--page--wrapper--checkout--info">
              <div className="checkout--bill--wrapper">
                <div className="checkout--page--wrapper--checkout--info--events--wrapper">
                  {cartData.map((eventInfo, i) => {
                    return (
                      <VNarrowCard
                        key={i}
                        eventInfo={eventInfo}
                        setTotalPriceFunc={setTotalPriceFunc}
                      />
                    );
                  })}
                </div>
                <div className="checkout--page--checkout--total--sum">
                  <p>Total:</p>
                  <p>${totalPrice} USD</p>
                </div>
              </div>
              <form className="checkout--form">
                <label htmlFor="">Full Name</label>
                <input type="text" />
                <label htmlFor="">Card No.</label>
                <input type="text" />
                <label htmlFor="">Expires</label>
                <input type="date" />
                <label htmlFor="">PIN</label>
                <input type="password" name="pin" maxLength="4" />
              </form>
            </div>
          </div>
          <div className="checkout--page--action--buttons">
            <Link to="/cart">Back</Link>
            <button>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
