import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";
import "./SellerDashboard.css";
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
    this._setSellerDashBoardNavBar();
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

  handleDeleteItem = async _id => {
    console.log("deleteArtwork has been toggled");
    let data = new FormData();
    data.append("artID", _id);
    let response = await fetch("/delete-seller-art", {
      method: "POST"
    });
    let responseBody = await response.text();
    let body = await JSON.parse(responseBody);
    if (body.success) {
      this.handleSellerItems();
    }
    return;
  };

  _setSellerDashBoardNavBar = () => {
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
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div
          style={{
            margin: "130px 50px 50px 50px"
          }}
        >
          <h3 style={{ color: "#ff007a" }}>Your Dashboard</h3>
          <SellerDashboardOverview artworks={this.state.artworks} />

          <div className="sellerDashboard-items-row">
            <h1>My Items</h1>
            <div className="sellerDashboard-horizontal-line"></div>
          </div>
          <div className="sellerDashboard-items-container">
            <div className="sellerDashboard-items-header">
              <div style={{ width: "50px" }}></div>
              <div style={{ width: "160px" }}>Title</div>
              <div style={{ width: "160px" }}>Artist Name</div>
              <div style={{ width: "160px" }}>Category</div>
              <div style={{ width: "50px", textAlign: "center" }}>Qty</div>
              <div style={{ width: "150px" }}>Price</div>
              <div style={{ width: "50px", textAlign: "center" }}>Sold</div>
              <div style={{ width: "50px" }}></div>
            </div>

            {this.state.artworks.map(art => {
              return (
                <div className="sellerDashboard-items-body">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundImage: "url(" + art.artImageURL + ")",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover"
                    }}
                  >
                    {/* <img height="100%" src={art.artImageURL} /> */}
                  </div>
                  <div style={{ width: "160px" }}>{art.title}</div>
                  <div style={{ width: "160px" }}>{art.artist}</div>
                  <div style={{ width: "160px" }}>{art.category}</div>
                  <div style={{ width: "50px", textAlign: "center" }}>
                    {art.quantity}
                  </div>
                  <div style={{ width: "150px" }}>{art.price}</div>
                  <div style={{ width: "50px", textAlign: "center" }}>
                    {art.sold}
                  </div>
                  <button
                    style={{ width: "50px" }}
                    onChange={() => this.handleDeleteItem(art._id)}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

let SellerDashboard = connect()(UnconnectedSellerSellerDashboard);

export default SellerDashboard;
