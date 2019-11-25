import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";
import "./SellerDashboard.css";
import { Link } from "react-router-dom";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: []
    };
  }
  componentDidMount = () => {
    this.handleSellerItems();
  };

  handleSellerItems = async () => {
    let response = await fetch("/this-seller-art");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body", body);
    let sellerArtworks = body.message;
    this.setState({ artworks: sellerArtworks });
    console.log("message", sellerArtworks);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="sellerDashboardContainer">
          <div>Dashboard</div>
          <div>
            <h1>My Items</h1>
            <div>
              <Link to={"/artupload"}>Upload Art</Link>
            </div>
            <div className="myListHeader">
              <div>Art Preview</div>
              <div>Title</div>
              <div>Artist Name</div>
              <div>Category</div>
              <div>Quantity</div>
            </div>
            <div className="myListItemContainer">
              {this.state.artworks.map(art => {
                return (
                  <div className="myListItems">
                    <img src={art.artImageURL} width="10%" />
                    <div>{art.title}</div>
                    <div>{art.artist}</div>
                    <div>{art.category}</div>
                    <div>{art.quantity}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
