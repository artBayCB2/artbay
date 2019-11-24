import React, { Component } from "react";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";
import "./SellerDashboard.css";

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
    let sellerArtObject = body.message;
    console.log("message", sellerArtObject);
    this.setState({ artworks: sellerArtObject[0] });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sellerDashboardContainer">
          <div className="overviewContainer">
            SellerDashboardOverview Insert Here
          </div>
          <div>
            <div>
              <h1>My Items</h1>
            </div>
            <div className="myListContainer">
              <div>
                <img src={this.state.artworks.artImageURL} width="5%" />
              </div>
              <div>{this.state.artworks.dateArtUploaded}</div>
              <div>{this.state.artworks.name}</div>
              <div>{this.state.artworks.artist}</div>
              <div>{this.state.artworks.category}</div>
              <div>{this.state.artworks.quantity}</div>
              <div>{this.state.artworks.price}</div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
