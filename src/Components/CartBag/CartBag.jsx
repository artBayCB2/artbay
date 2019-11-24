import React, { Component } from "react";
import "./CartBag.css";

export class CartBag extends Component {
  render() {
    return (
      <div className="cartbag-container">
        <img width="20px" height="30px" src="../assets/CartBagIcon.png" />
        <div className="cartbag-itemcount">2</div>
      </div>
    );
  }
}

export default CartBag;
