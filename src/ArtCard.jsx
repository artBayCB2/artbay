import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ArtCard.css";

export default class ArtCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favArt: false
    };
  }

  selectFavArt = () => {
    console.log(this.state.favArt);
    let _favState = this.state.favArt;
    this.setState({
      favArt: !_favState
    });
  };

  render() {
    return (
      <div className="artcard-card">
        <Link to={"/artDetails/" + this.props.art._id}>
          <img width="100%" src={this.props.art.artImageURL} />
        </Link>
        <div className="artcard-details">
          <h3>{this.props.art.title}</h3>
          <p>{this.props.art.artist}</p>
          <div className="artcard-details-row">
            <h2>${this.props.art.price}</h2>

            <div className="artcard-details-icons">
              {this.state.favArt ? (
                <img
                  onClick={this.selectFavArt}
                  src="../assets/FavIconTrue.png"
                />
              ) : (
                <img
                  onClick={this.selectFavArt}
                  src="../assets/FavIconFalse.png"
                />
              )}
              <img src="../assets/CartIcon.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
