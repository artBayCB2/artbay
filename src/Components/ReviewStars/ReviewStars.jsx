import React, { Component } from "react";
import "./ReviewStars.css";

export class ReviewStars extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.reviewstars);
    let _star1 = this.props.reviewstars > 0 ? true : false;
    let _star2 = this.props.reviewstars > 1 ? true : false;
    let _star3 = this.props.reviewstars > 2 ? true : false;
    let _star4 = this.props.reviewstars > 3 ? true : false;
    let _star5 = this.props.reviewstars > 4 ? true : false;

    return (
      <div className="review-row">
        {_star1 ? (
          <img src="../assets/MarkedStarIcon.png" />
        ) : (
          <img src="../assets/StarIcon.png" />
        )}
        {_star2 ? (
          <img src="../assets/MarkedStarIcon.png" />
        ) : (
          <img src="../assets/StarIcon.png" />
        )}
        {_star3 ? (
          <img src="../assets/MarkedStarIcon.png" />
        ) : (
          <img src="../assets/StarIcon.png" />
        )}
        {_star4 ? (
          <img src="../assets/MarkedStarIcon.png" />
        ) : (
          <img src="../assets/StarIcon.png" />
        )}
        {_star5 ? (
          <img src="../assets/MarkedStarIcon.png" />
        ) : (
          <img src="../assets/StarIcon.png" />
        )}
      </div>
    );
  }
}

export default ReviewStars;
