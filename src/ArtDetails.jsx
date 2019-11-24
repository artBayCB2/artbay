import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Description from "./Description.jsx";
import Review from "./Reviews.jsx";
import NavBar from "./NavBar.jsx";
import "./ArtDetails.css";

class UnconnectedArtDetails extends Component {
  constructor() {
    super();
    this.state = {
      art: [],
      buttonValue: "description"
    };
  }
  componentDidMount = () => {
    this.getArtObj();
  };

  getArtObj = async () => {
    let response = await fetch("/all-art");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);

    let artObj = body.message.filter(art => {
      console.log(this.props.artID, "dsad", art._id);
      return art._id === this.props.artID;
    });

    console.log("DSAD", artObj);
    this.setState({
      art: artObj[0]
    });
  };
  renderDescription = () => {
    this.setState({
      buttonValue: "description"
    });
  };

  renderReviews = () => {
    this.setState({
      buttonValue: "reviews"
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="artdetails-container">
          <div className="artdetails-top-container">
            <div className="artdetails-top-right-container">
              <img src={this.state.art.artImageURL}></img>
            </div>
            <div className="artdetails-top-left-container">
              <p className="artdetails-title">{this.state.art.title}</p>
              <p className="artdetails-artist">
                Drawing by{" "}
                <Link to={"/artistCollection/" + this.state.art.artist}>
                  {this.state.art.artist}
                </Link>
              </p>
              <p className="artdetails-price">${this.state.art.price}</p>
            </div>
          </div>
          <div className="middleContainer">
            <button onClick={this.renderDescription}>Description</button>
            <button onClick={this.renderReviews}>Reviews</button>
          </div>
          <div className="contentContainer"></div>
          {this.state.buttonValue === "description" ? (
            <Description description={this.state.art.description}></Description>
          ) : (
            <Review userID={this.state.art._id}></Review>
          )}
        </div>
      </React.Fragment>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let ArtDetails = connect(mapStateToProps)(UnconnectedArtDetails);
export default ArtDetails;
