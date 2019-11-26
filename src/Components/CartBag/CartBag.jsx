import React, { Component } from "react";
import { connect } from "react-redux";
import "./CartBag.css";

export class UnconnectedCartBag extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }

  // componentDidMount() {
  //   this.totalItemsCart();
  // }

  // componentDidUpdate() {
  //   this.totalItemsCart();
  // }

  // totalItemsCart = async () => {
  //   let response = await fetch("/get-cart-items");
  //   let responseBody = await response.text();

  //   let body = JSON.parse(responseBody);

  //   console.log(
  //     "length",
  //     this.state.cart.length,
  //     "-",
  //     body.message[0].cart.length,
  //     this.state.cart.length !== body.message[0].cart.length,
  //     typeof this.state.cart
  //   );

  //   if (this.state.cart.length !== body.message[0].cart.length) {
  //     this.setState({
  //       cart: body.message[0].cart
  //     });
  //   }
  // };

  render() {
    let cartLength = 0;
    if (this.props.cartItems.cart !== undefined) {
      console.log("dasdsa", this.props.cartItems);
      cartLength = this.props.cartItems.cart.length;
    }
    return (
      <div className="cartbag-container">
        <img width="20px" height="30px" src="../assets/CartBagIcon.png" />
        <div className="cartbag-itemcount">{cartLength}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    cartItems: state.cartItems
  };
};
let CartBag = connect(mapStateToProps)(UnconnectedCartBag);

export default CartBag;
