import React, { Component } from "react";
import "./SellerDashboardOverview.css";
import DashBoardOverviewCard from "./Components/DashBoardOverviewCard/DashBoardOverviewCard.jsx";

class SellerDashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: []
    };
  }
  componentDidMount = () => {
    this.handleSellerOverview();
  };

  handleSellerOverview = async () => {
    let response = await fetch("/this-seller-art");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body", body);
    let sellerOverview = body.message;
    this.setState({ overview: sellerOverview });
    console.log("message", sellerOverview);
  };

  sellerRev = () => {
    let sellerRev = 0;
    this.state.overview.forEach(item => {
      sellerRev = sellerRev + item.price;
    });
    console.log("sellerRev", sellerRev);
    return sellerRev;
  };

  render() {
    return (
      <React.Fragment>
        <div className="overviewContainer">
          {/* <h1>Dashboard</h1> */}
          <div className="overviewHeader">
            <DashBoardOverviewCard title="Revenue" value="0" />
            <DashBoardOverviewCard title="Customers" value="0" />
            <DashBoardOverviewCard title="Sold" value="0" />
            <DashBoardOverviewCard title="In Stock" value="0" />
          </div>
          {/* <div className="overviewBody">
            <div>{this.sellerRev()}</div>
            <div>Customers</div>
            <div>Items Sold</div>
            <div>{this.state.overview.length}</div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboardOverview;
