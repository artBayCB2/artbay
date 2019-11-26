import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ShoppingCartItem extends Component {
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
    console.log(body);
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
        <div className="ShoppingCartItem-imgLeft">
          <img
            className="ShoppingCartItem-itemImg"
            src={this.props.artElem.artImageURL}
            width="50px"
          ></img>
          <Link to={"/artistCollection/" + this.props.artElem.artist}>
            <div>{this.props.artElem.artist}</div>
          </Link>
        </div>

        <div className="ShoppingCartItem-btn">
          <button onClick={this.reduceQuantity}>-</button>

          {this.state.quantity}
          <button onClick={this.increaseQuantity}>+</button>
        </div>
        <div className="ShoppingCartItem-Right">
          <p>${this.props.artElem.price}</p>
        </div>
        <div className="ShoppingCartItem-remove-btn">
          <Link to="/cart">
            <button onClick={this.removeArt}>X</button>
          </Link>
        </div>
      </div>
    );
  }
}
