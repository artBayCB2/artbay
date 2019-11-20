import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ArtCard extends Component {
  render() {
    return (
      // link to artdetails >> sent to router with ID
      //router renders artdetail page and sends art obj to ArtDetail page
      <Link toto={"/artDetails/" + this.props.art.id}>
        <div>
          <img src={this.props.art.originalPiece} width="100px"></img>
          <div>
            <h3>{this.props.art.artist}</h3>
            <div>{this.props.art.price}</div>
          </div>
        </div>
      </Link>
    );
  }
}
