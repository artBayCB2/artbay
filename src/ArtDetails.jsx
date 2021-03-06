import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Description from "./Description.jsx";
import Review from "./Reviews.jsx";
import NavBar from "./NavBar.jsx";
import "./ArtDetails.css";
import ReviewStars from "./Components/ReviewStars/ReviewStars.jsx";
import Footer from "./Components/Footer/Footer.jsx";

import LoadingOverlay from "react-loading-overlay";
import "./ArtDetails.css";
import { withRouter } from "react-router-dom";

class UnconnectedArtDetails extends Component {
  constructor() {
    super();
    this.state = {
      art: [],
      buttonValue: "description",
      quantity: 1,
      loading: true,
      reviews: [],
      averageRating: 0
    };
  }
  componentWillMount = () => {
    this.getArtObj();
    this._setArtDetailsNavBar();
  };

  getArtObj = async () => {
    let response = await fetch("/all-art");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);

    let artObj = body.message.filter(art => {
      return art._id === this.props.artID;
    });

    let data = new FormData();
    data.append("itemID", artObj[0]._id);
    let reviewResponse = await fetch("/all-item-reviews", {
      method: "POST",
      body: data
    });
    let reviewResponseBody = await reviewResponse.text();

    let reviewBody = await JSON.parse(reviewResponseBody);
    console.log("/all-item-reviews responseBody", reviewBody);
    // if (this.state.reviews.length !== reviewBody.message.length)
    let _averageRating = 0;
    if (reviewBody.success) {
      let _reviewStars = 0;

      if (reviewBody.message.length !== undefined) {
        reviewBody.message.forEach(review => {
          _reviewStars = _reviewStars + review.reviewerStarRating;
        });

        _averageRating = _reviewStars / reviewBody.message.length;
      }
    }

    this.setState({
      reviews: reviewBody.message,
      averageRating: _averageRating,
      art: artObj[0],
      loading: false
    });
  };

  addtoCart = async () => {
    let data = new FormData();

    data.append("cart", JSON.stringify(this.state.art));
    let response = await fetch("/update-cart", { method: "POST", body: data });
    let responseBody = await response.text();

    let body = await JSON.parse(responseBody);

    if (body.success) {
      this.props.dispatch({
        type: "update-cart",
        value: body.message
      });
      this.props.history.push("/cart");
    }
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
    if (this.state.art.originalPiece) {
      let _quantity = this.state.quantity;
      this.setState({
        quantity: _quantity
      });
    }

    if (!this.state.art.originalPiece) {
      let _quantity = this.state.quantity + 1;

      if (_quantity <= this.state.art.quantity) {
        this.setState({
          quantity: _quantity
        });
      }
    }
  };

  _setArtDetailsNavBar = () => {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: true
    });
  };

  render() {
    console.log("renderrrr");
    return (
      <>
        {this.state.loading ? (
          <LoadingOverlay
            active={this.state.loading}
            spinner
            text="Loading your content..."
            styles={{
              wrapper: {
                width: "400px",
                height: "400px",
                overflow: this.state.loading ? "hidden" : "scroll"
              }
            }}
          >
            {/* <React.Fragment>
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
                      <ReviewStars reviewstars={this.state.averageRating} />
                      <div style={{ marginLeft: "10px" }}>
                        {this.state.reviews.length > 0
                          ? this.state.reviews.length
                          : "No reviews"}
                      </div>
                    </div>
                    <p className="artdetails-price">${this.state.art.price}</p>
                    <div className="artdetails-submit-cart-row">
                      <div className="artdetails-submit-cart-row-left">
                        <button onClick={this.reduceQuantity}>-</button>
                        {this.state.quantity}
                        <button onClick={this.increaseQuantity}>+</button>
                      </div>
                      <div className="artdetails-submit-cart-row-right">
                        <button onClick={this.addtoCart}>Add to Basket</button>
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
            </React.Fragment> */}
          </LoadingOverlay>
        ) : (
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
                    <ReviewStars reviewstars={this.state.averageRating} />
                    <div style={{ marginLeft: "10px" }}>
                      {this.state.reviews.length == 1
                        ? "1 review"
                        : this.state.reviews.length > 1
                        ? this.state.reviews.length + " reviews"
                        : "No reviews"}
                    </div>
                  </div>
                  <p className="artdetails-price">${this.state.art.price}</p>
                  <div className="artdetails-submit-cart-row">
                    <div className="artdetails-submit-cart-row-left">
                      <button onClick={this.reduceQuantity}>-</button>
                      {this.state.quantity}
                      <button onClick={this.increaseQuantity}>+</button>
                    </div>
                    <div className="artdetails-submit-cart-row-right">
                      <button onClick={this.addtoCart}>Add to Basket</button>
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
                  <Review artID={this.state.art._id}></Review>
                )}
              </div>
            </div>
            <Footer />
          </React.Fragment>
        )}
      </>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtDetails = connect(mapStateToProps)(UnconnectedArtDetails);
export default withRouter(ArtDetails);
