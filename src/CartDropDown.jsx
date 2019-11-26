import React, { Component } from "react";
import CartItemDropdown from "./CartItemDropdown.jsx";

export default class CartDropDown extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }

  componentDidMount() {
    this.cartItem();
  }

  cartItem = async () => {
    let response = await fetch("/get-cart-items");
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);

    this.setState({
      cart: body.message[0].cart
    });
  };

  subTotal = () => {
    let total = 0;

    this.state.cart.forEach(art => {
      total = total + art.price;
    });

    return total;
  };

  render() {
    return (
      <div className="CartDropDown-container">
        <div className="CartDropDown-topBanner">
          <h3>Your Cart</h3>
        </div>
        <div className="CartDropDown-itemContainer">
          {this.state.cart.map(art => {
            return <CartItemDropdown artElem={art}></CartItemDropdown>;
          })}
        </div>
        <div className="CartDropDown-Subtotal">
          <div className="CartDropDown-Subtotal-left">
            Subtotal: ${this.subTotal().toFixed(2)}
          </div>
          <div className="CartDropDown-Subtotal-right">
            {/* get subtotal  */}
          </div>
        </div>
      </div>
    );
  }
}
