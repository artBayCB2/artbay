import React, { Component } from "react";
import "./CartBag.css";

export class CartBag extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    this.totalItemsCart();
  }
  componentDidUpdate() {
    this.totalItemsCart();
  }

  totalItemsCart = async () => {
    let response = await fetch("/get-cart-items");
    let responseBody = await response.text();
    console.log("CART!!!!", responseBody);
    let body = JSON.parse(responseBody);
    console.log("CART", body.message[0].cart);

    this.setState({
      cart: body.message[0].cart
    });
  };

  render() {
    return (
      <div className="cartbag-container">
        <img width="20px" height="30px" src="../assets/CartBagIcon.png" />
        <div className="cartbag-itemcount">{this.state.cart.length}</div>
      </div>
    );
  }
}

export default CartBag;
