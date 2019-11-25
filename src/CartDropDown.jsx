import React, { Component } from "react";

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
    console.log("CART!!!!", responseBody);
    let body = JSON.parse(responseBody.message);

    this.setState({
      cart: body
    });
  };

  render() {
    return (
      <div className="CartDropDown-container">
        <div className="CartDropDown-topBanner">
          <h3>Your Cart</h3>
        </div>
        <div className="CartDropDown-itemContainer">
          {this.state.cart.map(art => {
            <div className="CartDropDown-CartCard">
              <CartItemDropdown artItem={art}></CartItemDropdown>;
            </div>;
          })}
        </div>
        <div className="CartDropDown-Subtotal">
          <div className="CartDropDown-Subtotal-left">Subtotal: </div>
          <div className="CartDropDown-Subtotal-right">
            {/* get subtotal  */}
          </div>
        </div>
      </div>
    );
  }
}
