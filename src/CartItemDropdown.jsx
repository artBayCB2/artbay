import React, { Component } from "react";

export default class CartItemDropdown extends Component {
  render() {
    return (
      <div className="CartItemDropdown-container">
        <div className="CartItemDropdown-imgLeft">
          <img
            className="CartItemDropdown-itemImg"
            src={this.props.artElem.artImageURL}
            width="50px"
          ></img>
        </div>
        <div className="CartItemDropdown-imgRight">
          <p>by: {this.props.artElem.artist}</p>
          <p>${this.props.artElem.price}</p>
          <p>{this.props.artElem.medium}</p>
        </div>
      </div>
    );
  }
}
