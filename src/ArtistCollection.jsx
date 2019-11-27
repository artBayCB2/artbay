import React, { Component } from "react";
import ArtCard from "./ArtCard.jsx";

import { connect } from "react-redux";
import "./ArtistCollection.css";
import NavBar from "./NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";

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
    this._setArtistCollectionNavBar();
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

  _setArtistCollectionNavBar = () => {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: true
    });
  };

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
              <div className="ArtistCollection-artist">
                {" "}
                Art by {this.props.artist}
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
          <>
            <NavBar></NavBar>
            <div className="artistCollection-container">
              <div>
                <div className="artistCollection-title">
                  {this.props.artist}
                </div>
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
            <Footer></Footer>
          </>
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
