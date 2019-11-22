import React, { Component } from "react";
import ArtCard from "./ArtCart.jsx";

//fetch data from endpoint
// server side or frontend ?????
let getArtCollection = async artistName => {
  let response = await fetch("/search-artItems?artist=" + artistName);
  let reponsebody = await reponsebody.text();

  body = JSON.parse(reponsebody);
  return body.message;
};

let artistCollection = artistName => {
  let allArtCollection = getArtCollection(artistName);

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
          <div>Artist: {this.props.artist}</div>
        </div>
        <div>
          <h2>Collection</h2>
          <div>
            {artistCollection(this.props.artist).map(artElm => {
              <div>
                <ArtCard art={artElm}></ArtCard>;
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
