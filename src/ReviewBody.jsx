import React, { Component } from "react";

export default class ReviewBody extends Component {
  render() {
    return (
      <>
        <div className="review-body">
          <div className="review-body-user">
            {this.props.reviewBody.reviewerName.split("@")[0]}
          </div>
          <div className="review-body-review">
            {this.props.reviewBody.review}
          </div>
        </div>
      </>
    );
  }
}
