import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ArtDetails.css";

let artistName = artistId => {
  let candidates = initialBuyers.filter(buyer => {
    return buyer.id === artistId;
  });

  return candidates[0].name;
};

let reviewsbyArtists = itemId => {
  let allreviews = reviews.filter(elem => {
    return elem.itemId === itemId;
  });

  return allreviews;
};

export default class UnconnectedArtDetails extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.art.image} width="300px"></img>
          <div>Artist: {this.props.art.artistName}</div>
          <div>Price: {this.props.art.price}</div>
          <div>Type: {this.props.art.type}</div>
          <div>Size: {this.props.art.size}</div>
        </div>
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviewsbyArtists(this.props.art.id).map(review => (
              <li>
                <Link to={"/artist/" + review.artistId}>
                  {artistName(review.artistId)}
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
  return { art: state.art };
};
let ArtDetails = connect(mapStateToProps)(UnconnectedItemDetails);
export default ArtDetails;
