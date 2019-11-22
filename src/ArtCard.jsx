import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ArtCard.css";

export default class ArtCard extends Component {
  render() {
    return (
      <div className="ArtCard-card">
        <Link to={"/artDetails/" + this.props.art._id}>
          <div>
            <img src={this.props.art.artImageURL} width="100%"></img>
          </div>
          <div className="ArtCard-container">
            <div>
              <h3>{this.props.art.artist}</h3>
            </div>

            <div>${this.props.art.price}</div>
          </div>
        </Link>
      </div>
    );
  }
}
