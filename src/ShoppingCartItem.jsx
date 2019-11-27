import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ShoppingCartItem.css";
import { connect } from "react-redux";

class UnconnectedShoppingCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
  }

  reduceQuantity = () => {
    let _quantity = this.state.quantity - 1;
    if (_quantity < 1) {
      _quantity = 1;
    }
    this.setState({
      quantity: _quantity
    });
  };

  removeArt = async () => {
    let data = new FormData();
    data.append("itemID", this.props.artElem._id);
    let response = await fetch("/delete-cart-item", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("shoppingcartitem body obj", body);
    if (body.success) {
      this.props.dispatch({
        type: "update-cart",
        value: body.message
      });
    } else {
      alert("Something went wrong");
    }
  };

  increaseQuantity = () => {
    if (this.props.artElem.originalPiece) {
      let _quantity = this.state.quantity;
      this.setState({
        quantity: _quantity
      });
    }

    if (!this.props.artElem.originalPiece) {
      let _quantity = this.state.quantity + 1;

      if (_quantity <= this.props.artElem.quantity) {
        this.setState({
          quantity: _quantity
        });
      }
    }
  };

  render() {
    return (
      <div className="ShoppingCartItem-container">
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundImage: "url(" + this.props.artElem.artImageURL + ")",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginRight: "20px",
            borderRadius: "5px"
          }}
        >
          {/* <img src={this.props.artElem.artImageURL} width="50px"></img> */}
        </div>
        <div style={{ width: "180px" }}>
          <Link to={"/artistCollection/" + this.props.artElem.artist}>
            <div>{this.props.artElem.artist}</div>
          </Link>
        </div>

        <div className="ShoppingCartItem-incdec-button-row">
          <button
            className="ShoppingCartItem-incdec-button"
            onClick={this.reduceQuantity}
          >
            -
          </button>

          {this.state.quantity}

          <button
            className="ShoppingCartItem-incdec-button"
            onClick={this.increaseQuantity}
          >
            +
          </button>
        </div>

        <div style={{ width: "200px" }}>
          <p>${this.props.artElem.price * this.state.quantity}</p>
        </div>
        <div style={{ width: "50px" }}>
          <button
            className="ShoppingCartItem-remove-button"
            onClick={this.removeArt}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

let ShoppingCartItem = connect()(UnconnectedShoppingCartItem);

export default ShoppingCartItem;
