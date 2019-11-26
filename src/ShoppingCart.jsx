import React, { Component } from "react";
import ShoppingCartItem from "./ShoppingCartItem.jsx";
import ShoppingCartTotal from "./ShoppingCartTotal.jsx";
import { Link } from "react-router-dom";
import "./shoppingCart.css";

export default class ShoppingCart extends Component {
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

  subTotalTax = () => {
    let total = this.subTotal();

    return total * 0.14;
  };

  render() {
    return (
      <>
        <div className="shoppingCart-container">
          <h2>Shopping Cart</h2>
        </div>
        <div className="shoppingCart-container">
          <div className="shoppingCart-item-container">
            {this.state.cart.map(art => {
              console.log("sdasd", this.state.cart);
              return <ShoppingCartItem artElem={art}></ShoppingCartItem>;
            })}
          </div>
        </div>
        <div className="shoppingCart-shopping-btn">
          <Link to={"/"}>
            <button>CONTINUE SHOPPING</button>
          </Link>
        </div>
        <div className="shoppingCart-total-container">
          <ShoppingCartTotal
            subTotalTax={this.subTotalTax()}
            subTotal={this.subTotal()}
          ></ShoppingCartTotal>
        </div>
      </>
    );
  }
}
