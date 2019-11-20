import React, { Component } from "react";
import ArtCard from "./ArtCart.jsx";

//fetch data from endpoint
// server side or frontend ?????
let getArtCollection = () => {};

let artistCollection = artistName => {
  let allArtCollection = getArtCollection();

  let artistCollect = artCollection.filter(art => {
    return art.artistName === artistName;
  });

  return artistCollect;
};

class UnconnectedArtistCollection extends Component {
  render() {
    return (
      <div>
        <div>
          <div>Artist: {this.props.art.artistName}</div>
        </div>
        <div>
          <h2>Collection</h2>
          <div>
            {artistCollection(this.props.art.artistName).map(art => {
              <div>
                <ArtCard artPiece={art}></ArtCard>;
              </div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtistCollection = connect(mapStateToProps)(UnconnectedArtistCollection);
export default ArtistCollection;
