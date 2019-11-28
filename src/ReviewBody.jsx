import React, { Component } from "react";
import "./ReviewBody.css";
import ReviewStars from "./Components/ReviewStars/ReviewStars.jsx";

export default class ReviewBody extends Component {
  render() {
    return (
      <>
        <div className="review-body-container">
          <div className="review-body-container-left">
            <img
              onClick={this.showLogout}
              style={{ cursor: "pointer", marginLeft: "50px" }}
              height="40px"
              src={this.props.reviewBody.reviewerImageURL}
            />
          </div>
          <div className="review-body-container-right">
            <div className="review-body-user">
              {this.props.reviewBody.reviewerName.split("@")[0]}
            </div>
            <div className="review-body-stars">
              <ReviewStars
                reviewstars={this.props.reviewBody.reviewerStarRating}
              />
              <div className="review-body-date">
                {this.props.reviewBody.reviewDate}
              </div>
            </div>
            <div className="review-body-review">
              {this.props.reviewBody.review}
            </div>
          </div>
        </div>
      </>
    );
  }
}
