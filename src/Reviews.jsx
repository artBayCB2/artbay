import React, { Component } from "react";
import ReviewBody from "./ReviewBody.jsx";
import "./Reviews.css";

export default class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviewString: "",
      reviewBtn: true,
      review: [],
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
      reviewRating: 0
    };
  }
  componentDidMount() {
    this.getReviews();
  }
  reviewChange = evt => {
    this.setState({ reviewString: evt.target.value });
  };
  submitReview = async () => {
    let data = new FormData();
    console.log("REview-this.props.artID", this.props.artID);
    data.append("itemID", this.props.artID);
    data.append("review", this.state.reviewString);
    data.append("rating", JSON.stringify(this.state.reviewRating));

    let response = await fetch("/add-item-review", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();

    let body = await JSON.parse(responseBody);
    console.log("/add-item-review responseBody ", body);
    if (body.success) {
      this.setState({
        review: body.message.reverse()
      });
    } else {
      alert(body.message);
    }
  };

  writeReview = () => {
    this.setState({
      reviewBtn: !this.state.reviewBtn
    });
  };

  setReviewRating = r => {
    let _reviewRating = this.state.reviewRating;
    if (r === _reviewRating) {
      this.setState({
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
        reviewRating: 0
      });
    } else {
      this.setState({
        star1: r > 0 ? true : false,
        star2: r > 1 ? true : false,
        star3: r > 2 ? true : false,
        star4: r > 3 ? true : false,
        star5: r > 4 ? true : false,
        reviewRating: r
      });
    }
  };

  getReviews = async () => {
    let data = new FormData();
    console.log("REview-this.props.artID", this.props.artID);
    data.append("itemID", this.props.artID);
    let response = await fetch("/all-item-reviews", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();

    let body = await JSON.parse(responseBody);
    console.log("/all-item-reviews responseBody", body);
    if (this.state.review.length !== body.message.length)
      if (body.success) {
        this.setState({
          review: body.message.reverse()
        });
      }
  };

  render() {
    console.log(this.props.artID);
    return (
      <>
        <div className="review-container">
          {/* {this.state.reviewBtn ? ( */}
          <div className="review-container-left">
            <h2>Write a review for this art</h2>

            <div className="review-star-row">
              {this.state.star1 ? (
                <img
                  onClick={() => this.setReviewRating(1)}
                  src="../assets/MarkedStarIcon.png"
                />
              ) : (
                <img
                  onClick={() => this.setReviewRating(1)}
                  src="../assets/OutlineStarIcon.png"
                />
              )}
              {this.state.star2 ? (
                <img
                  onClick={() => this.setReviewRating(2)}
                  src="../assets/MarkedStarIcon.png"
                />
              ) : (
                <img
                  onClick={() => this.setReviewRating(2)}
                  src="../assets/OutlineStarIcon.png"
                />
              )}
              {this.state.star3 ? (
                <img
                  onClick={() => this.setReviewRating(3)}
                  src="../assets/MarkedStarIcon.png"
                />
              ) : (
                <img
                  onClick={() => this.setReviewRating(3)}
                  src="../assets/OutlineStarIcon.png"
                />
              )}
              {this.state.star4 ? (
                <img
                  onClick={() => this.setReviewRating(4)}
                  src="../assets/MarkedStarIcon.png"
                />
              ) : (
                <img
                  onClick={() => this.setReviewRating(4)}
                  src="../assets/OutlineStarIcon.png"
                />
              )}
              {this.state.star5 ? (
                <img
                  onClick={() => this.setReviewRating(5)}
                  src="../assets/MarkedStarIcon.png"
                />
              ) : (
                <img
                  onClick={() => this.setReviewRating(5)}
                  src="../assets/OutlineStarIcon.png"
                />
              )}
            </div>

            <textarea type="text" onChange={this.reviewChange} />

            <button onClick={this.submitReview}>Submit</button>
          </div>
          {/* ) : (
          <></>
        )} */}
          <div className="review-container-right">
            {this.state.review.map(review => {
              return <ReviewBody reviewBody={review}></ReviewBody>;
            })}
            {/* <div className="review-write-btn">
              <button onClick={this.writeReview}>Write a Review</button>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}
