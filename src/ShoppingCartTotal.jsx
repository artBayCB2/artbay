import React, { Component } from "react";

export default class ShoppingCartTotal extends Component {
  render() {
    return (
      <>
        <div className="shoppingCart-total-title">
          <h2>Cart Total</h2>
          <div className="shoppingCart-total-row">
            <div className="shoppingCart-total-left">Subtotal</div>
            <div className="shoppingCart-total-right">
              {this.props.subTotal}
            </div>
          </div>
          <div className="shoppingCart-total-row">
            <div className="shoppingCart-total-left">tax</div>
            <div className="shoppingCart-total-right">
              {this.props.subTotalTax}
            </div>
          </div>
          <div className="shoppingCart-total-row">
            <div className="shoppingCart-total-left">Shipping</div>
            <div className="shoppingCart-total-right">*Free Shipping*</div>
          </div>
          <div className="shoppingCart-total-row">
            <div className="shoppingCart-total-left">Total</div>
            <div className="shoppingCart-total-right">
              ${this.props.subTotalTax + this.props.subTotal}
            </div>
          </div>
          <div className="footer-FlexRow">
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
          <div className="ShoppingCartTotal-purchase-btn">
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </>
    );
  }
}
