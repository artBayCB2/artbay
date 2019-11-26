import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";
import "./SellerDashboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./Components/Footer/Footer.jsx";

class UnconnectedSellerSellerDashboard extends Component {
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

  handleDeleteItem = async () => {};

  render() {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: false
    });

    return (
      <React.Fragment>
        <NavBar />
        <SellerDashboardOverview />
        <div className="sellerDashboard-items-row">
          <h1>My Items</h1>
          <div className="sellerDashboard-horizontal-line"></div>
        </div>
        <div className="sellerDashboard-items-container">
          <div className="sellerDashboard-items-header">
            <div style={{ width: "10%" }}>Art Preview</div>
            <div style={{ width: "20%" }}>Title</div>
            <div style={{ width: "20%" }}>Artist Name</div>
            <div style={{ width: "10%" }}>Category</div>
            <div style={{ width: "5%" }}>Qty</div>
            <div style={{ width: "5%" }}>Sold</div>
            <div style={{ width: "10%" }}>Delete</div>
          </div>

          {this.state.artworks.map(art => {
            return (
              <div className="sellerDashboard-items-body">
                <div style={{ width: "10%" }}>
                  <img height="100%" width="100%" src={art.artImageURL} />
                </div>
                <div style={{ width: "20%" }}>{art.title}</div>
                <div style={{ width: "20%" }}>{art.artist}</div>
                <div style={{ width: "10%" }}>{art.category}</div>
                <div style={{ width: "5%" }}>{art.quantity}</div>
                <div style={{ width: "5%" }}>{art.sold}</div>
                <button>Delete</button>
              </div>
            );
          })}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

let SellerDashboard = connect()(UnconnectedSellerSellerDashboard);

export default SellerDashboard;
