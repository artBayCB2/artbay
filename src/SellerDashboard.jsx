import React, { Component } from "react";
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
        <div className="sellerDashboardContainer">
          <div className="overviewContainer">
            SellerDashboardOverview Insert Here
          </div>
          <div>
            <div>
              <h1>My Items</h1>
            </div>
            <div className="myListContainer">
              {this.state.artworks.map(art => {
                return (
                  <div>
                    <div className="div1">
                      <img src={art.artImageURL} width="10%" />
                    </div>
                    <div className="div2">{art.name}</div>
                    <div className="div3">{art.artist}</div>
                    <div className="div4">{art.category}</div>
                    <div className="div5">{art.quantity}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <Link to={"/artupload"}>Upload Art</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
