import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ArtDetails.css";

// must fetch userdata and search for User name by id
let userName = artistId => {
  // fetch userDate

  // let candidates = initialBuyers.filter(buyer => {
  //   return buyer.id === artistId;
  // });

  return candidates[0].name;
};

let reviewsbyUsers = itemId => {
  let allreviews = reviews.filter(elem => {
    return elem.itemId === itemId;
  });

  return allreviews;
};

class UnconnectedArtDetails extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.art.originalPiece} width="300px"></img>
          <div>Artist: {this.props.art.artist}</div>
          <div>Price: {this.props.art.price}</div>
          <div>medium: {this.props.art.medium}</div>
          <div>Quantity: {this.props.art.quantity}</div>
          <div>Size: {this.props.art.size}</div>
          <div>
            <p>Description: {this.props.art.description}</p>
          </div>
          <button onClick={addToCart(this.props.art.id)}>Add to Cart</button>
        </div>

        <div>
          <h2>Reviews</h2>
          <ul>
            {reviewsbyUsers(this.props.art.id).map(review => (
              <li>
                <Link to={"/artist/" + userName(review.userId)}>
                  {userName(review.userId)}
                </Link>

                <p>{review.review}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtDetails = connect(mapStateToProps)(UnconnectedArtDetails);
export default ArtDetails;
