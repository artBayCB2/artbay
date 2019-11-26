import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ArtCard.css";
import "../public/main.css";
import { type } from "os";

class UnconnectedArtCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favArt: false,
      count: 0
    };
  }

  selectFavArt = () => {
    console.log(this.state.favArt);
    let _favState = this.state.favArt;
    this.setState({
      favArt: !_favState
    });
  };

  addtoCart = async () => {
    console.log("count", this.state.count);
    if (this.state.count <= this.props.art.quantity) {
      let data = new FormData();
      data.append("cart", JSON.stringify(this.props.art));
      let response = await fetch("/update-cart", {
        method: "POST",
        body: data
      });
      let responseBody = await response.text();
      let body = JSON.parse(responseBody);
      console.log("AddtoCart MSG", body);

      if (body.success) {
        this.props.dispatch({
          type: "update-cart",
          value: body.message
        });
      }
      this.setState({
        count: this.state.count + 1
      });
    }
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

              <img onClick={this.addtoCart} src="../assets/CartIcon.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let ArtCard = connect()(UnconnectedArtCard);

export default ArtCard;
