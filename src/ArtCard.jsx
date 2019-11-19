import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ArtCard extends Component {
  render() {
    return (
      <Link toto={"/artDetails/" + this.props.artPiece.id}>
        <div>
          <img src={this.props.art.imagePath} width="100px"></img>
          <div>
            <h3>{this.props.art.name}</h3>
            <div>{this.props.art.price}</div>
          </div>
        </div>
      </Link>
    );
  }
}
