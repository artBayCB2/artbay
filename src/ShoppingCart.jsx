import React, { Component } from "react";
import ShoppingCartItem from "./ShoppingCartItem.jsx";
import ShoppingCartTotal from "./ShoppingCartTotal.jsx";
import { Link } from "react-router-dom";
import "./shoppingCart.css";
import NavBar from "./NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { connect } from "react-redux";
import { throws } from "assert";

class UnconnectedShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      length: 0,
      artQuantity: 1
    };
  }
  componentDidMount() {
    this.cartItem();
    this._setShoppingCartNavBar();
  }

  componentDidUpdate() {
    this.cartItem();
  }

  cartItem = async () => {
    let response = await fetch("/get-cart-items");
    let responseBody = await response.text();

    let body = JSON.parse(responseBody);
    console.log("length", this.props.cartItems.cart.length);

    if (this.props.cartItems.cart.length !== body.message[0].cart.length) {
      this.setState({
        cart: body.message[0].cart
      });
    }
  };

  artQuantity = artQuantity => {
    this.setState({ artQuantity: artQuantity });
  };

  subTotal = () => {
    let total = 0;
    if (this.props.cartItems.cart !== undefined) {
      this.props.cartItems.cart.forEach(art => {
        console.log(this.state.artQuantity);
        total = (total + art.price) * this.state.artQuantity;
      });
    }
    return total;
  };

  subTotalTax = () => {
    let total = this.subTotal();

    return total * 0.14;
  };

  _setShoppingCartNavBar = () => {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: true
    });
  };

  render() {
    return (
      <>
        <NavBar></NavBar>
        <div className="shoppingCart-container">
          <h2>Shopping Cart</h2>
          <div className="shoppingCart-container-row">
            <div className="shoppingCart-left-container">
              <Link to={"/"}>
                <button className="shoppingCart-button-c">
                  CONTINUE SHOPPING
                </button>
              </Link>
              {this.props.cartItems.cart === undefined ? (
                <div>Cart Is Empty</div>
              ) : (
                this.props.cartItems.cart.map(art => {
                  return (
                    <div className="shoppingCart-item-container">
                      <ShoppingCartItem
                        artElem={art}
                        artQuantity={this.artQuantity}
                      />
                    </div>
                  );
                })
              )}
            </div>

            <div className="shoppingCart-right-container">
              <ShoppingCartTotal
                subTotalTax={this.subTotalTax()}
                subTotal={this.subTotal()}
              ></ShoppingCartTotal>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

let mapStateToProps = state => {
  return { cartItems: state.cartItems };
};

let ShoppingCart = connect(mapStateToProps)(UnconnectedShoppingCart);
export default ShoppingCart;
