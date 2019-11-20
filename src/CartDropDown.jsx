import React, { Component } from "react";

//fetching cart items (artId)
let cartItem = () => {
  let cart = [];
  return cart;
};

let getArtObj = artId => {
  // fetching art obj
};

export default class CartDropDown extends Component {
  render() {
    return (
      <div className="CartDropDown-container">
        <div className="CartDropDown-topBanner">
          <h3>Your Cart</h3>
        </div>
        <div className="CartDropDown-itemContainer">
          {cartItem().map(artId => {
            <div className="CartDropDown-CartCard">
              <CartItemDropdown artID={getArtObj(artId)}></CartItemDropdown>;
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
