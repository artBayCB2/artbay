import React, { Component } from "react";
import ReviewBody from "./ReviewBody.jsx";

export default class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      reviewString: "",
      reviewBtn: false,
      review: []
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

    let response = await fetch("/add-item-review", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();

    let body = await JSON.parse(responseBody);
    console.log("/add-item-review responseBody ", body);
    if (body.success) {
      this.setState({
        review: body.message
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
          review: body.message
        });
      }
  };

  render() {
    return (
      <>
        <div>
          {this.state.review.map(review => {
            return <ReviewBody reviewBody={review}></ReviewBody>;
          })}
          <div className="review-write-btn">
            <button onClick={this.writeReview}>Write a Review</button>
          </div>
        </div>
        {this.state.reviewBtn ? (
          <div className="review-write">
            <h2 className="review-write-title">Write a Review</h2>

            <textarea
              className="review-write-input"
              type="text"
              onChange={this.reviewChange}
            />

            <button className="review-write-submit" onClick={this.submitReview}>
              Submit
            </button>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
