import React, { Component } from "react";
import ArtCard from "./ArtCard.jsx";

import { connect } from "react-redux";
import "./ArtistCollection.css";

import LoadingOverlay from "react-loading-overlay";

class UnconnectedArtistCollection extends Component {
  constructor() {
    super();
    this.state = {
      collection: [],
      loading: true
    };
  }

  componentDidMount = () => {
    this.setArtCollection();
  };

  setArtCollection = async () => {
    let response = await fetch("/search-artItems?artist=" + this.props.artist);
    let reponsebody = await response.text();

    let body = JSON.parse(reponsebody);

    let artistCollect = body.message.filter(art => {
      return art.artist === this.props.artist;
    });

    this.setState({
      collection: artistCollect,
      loading: false
    });
  };

  artistCollection = () => {};

  render() {
    return (
      <>
        {this.state.loading ? (
          <LoadingOverlay
            active={true}
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
            <div className="ArtistCollection-container">
              <div>
                <div>{this.props.artist}</div>
              </div>
              <div>
                <div className="artistCollection-rows">
                  {this.state.collection.map(artElm => {
                    return (
                      <div>
                        <ArtCard art={artElm}></ArtCard>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </LoadingOverlay>
        ) : (
          <div className="artistCollection-container">
            <div>
              <div className="artistCollection-title">{this.props.artist}</div>
            </div>
            <div>
              <div className="artistCollection-rows">
                {console.log(this.state.collection)}
                {this.state.collection.map(artElm => {
                  return (
                    <div>
                      <ArtCard art={artElm}></ArtCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtistCollection = connect(mapStateToProps)(UnconnectedArtistCollection);
export default ArtistCollection;
