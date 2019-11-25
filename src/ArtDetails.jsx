import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Description from "./Description.jsx";
import Review from "./Reviews.jsx";
import NavBar from "./NavBar.jsx";
import "./ArtDetails.css";
import ReviewStars from "./Components/ReviewStars/ReviewStars.jsx";
import Footer from "./Components/Footer/Footer.jsx";

class UnconnectedArtDetails extends Component {
  constructor() {
    super();
    this.state = {
      art: [],
      buttonValue: "description",
      quantity: 1
    };
  }
  componentDidMount = () => {
    this.getArtObj();
  };

  getArtObj = async () => {
    let response = await fetch("/all-art");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);

    let artObj = body.message.filter(art => {
      console.log(this.props.artID, "dsad", art._id);
      return art._id === this.props.artID;
    });

    console.log("DSAD", artObj);
    this.setState({
      art: artObj[0]
    });
  };
  renderDescription = () => {
    this.setState({
      buttonValue: "description"
    });
  };

  renderReviews = () => {
    this.setState({
      buttonValue: "reviews"
    });
  };

  reduceQuantity = () => {
    let _quantity = this.state.quantity - 1;
    if (_quantity < 1) {
      _quantity = 1;
    }
    this.setState({
      quantity: _quantity
    });
  };

  increaseQuantity = () => {
    let _quantity = this.state.quantity + 1;
    this.setState({
      quantity: _quantity
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="artdetails-container">
          <div className="artdetails-top-container">
            <div className="artdetails-top-left-container">
              <img src={this.state.art.artImageURL}></img>
            </div>
            <div className="artdetails-top-right-container">
              <p className="artdetails-title">{this.state.art.title}</p>
              <p className="artdetails-artist">
                {this.state.art.category} by{" "}
                <Link to={"/artistCollection/" + this.state.art.artist}>
                  {this.state.art.artist}
                </Link>
              </p>
              <div className="artdetails-review-row">
                <ReviewStars reviewstars={0} />
                <div style={{ marginLeft: "10px" }}>No reviews</div>
              </div>
              <p className="artdetails-price">${this.state.art.price}</p>
              <div className="artdetails-submit-cart-row">
                <div className="artdetails-submit-cart-row-left">
                  <button onClick={this.reduceQuantity}>-</button>
                  {this.state.quantity}
                  <button onClick={this.increaseQuantity}>+</button>
                </div>
                <div className="artdetails-submit-cart-row-right">
                  <button>Add to Basket</button>
                </div>
              </div>
            </div>
          </div>
          <div className="artdetails-middle-container">
            <button onClick={this.renderDescription}>Description</button>
            <button onClick={this.renderReviews}>Reviews</button>
          </div>
          <div className="artdetails-middle-content-container">
            {this.state.buttonValue === "description" ? (
              <Description
                description={this.state.art.description}
              ></Description>
            ) : (
              <Review userID={this.state.art._id}></Review>
            )}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtDetails = connect(mapStateToProps)(UnconnectedArtDetails);
export default ArtDetails;
