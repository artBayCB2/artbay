import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./ShoppingCartTotal.css";

export default class ShoppingCartTotal extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };
  render() {
    return (
      <>
        <div className="shoppingCart-total-container">
          <h2>Cart Total</h2>

          <div className="shoppingCart-total-row">
            <div>Subtotal</div>
            <div>${this.props.subTotal.toFixed(2)}</div>
          </div>

          <div className="shoppingCart-total-row">
            <div>tax</div>
            <div>${this.props.subTotalTax.toFixed(2)}</div>
          </div>

          <div className="shoppingCart-total-row">
            <div>Shipping</div>
            <div>Free</div>
          </div>

          <div className="shoppingCart-grand-total-row">
            <div>Total</div>
            <div>${this.props.subTotalTax + this.props.subTotal}</div>
          </div>

          <div className="ShoppingCartTotal-purchase-button">
            <StripeCheckout
              style={{
                width: "100%"
              }}
              token={this.onToken}
              stripeKey="pk_test_YnDf06NULFsYuFk99DwENrqm00kzWHkOoK"
            />
          </div>

          <div className="ShoppingCartTotal-cards">
            <img height="12px" width="25px" src="../assets/VisaImage.png" />
            <img
              height="12px"
              width="25px"
              src="../assets/MasterCardImage.png"
            />
            <img height="12px" width="25px" src="../assets/MaestroImage.png" />
            <img height="12px" width="25px" src="../assets/CirrusImage.png" />
            <img
              height="12px"
              width="25px"
              src="../assets/AmericanExpressImage.png"
            />
          </div>
        </div>
      </>
    );
  }
}
