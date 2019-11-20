import React, { Component } from "react";

export default class CartItemDropdown extends Component {
  render() {
    return (
      <div className="CartItemDropdown-container">
        <div className="CartItemDropdown-imgLeft">
          <img
            className="CartItemDropdown-itemImg"
            src={this.props.art.originalPiece}
            width="300px"
          ></img>
        </div>
        <div className="CartItemDropdown-imgRight">
          <p>{this.props.art.description.subString(0, 10)}</p>
          <p>by: {this.props.art.artist}</p>
          <p>${this.props.art.price}</p>
          <p>{this.props.art.medium}</p>
        </div>
      </div>
    );
  }
}
