import React, { Component } from "react";
import "./SellerDashboardOverview.css";
import DashBoardOverviewCard from "./Components/DashBoardOverviewCard/DashBoardOverviewCard.jsx";

class SellerDashboardOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.getOverviewData();
  };

  getOverviewData = v => {
    console.log("here", this.props.artworks);
    let sellerRev = 0;
    let totalCustomers = 0;
    let totalSold = 0;
    let inStock = 0;
    this.props.artworks.forEach(item => {
      sellerRev = sellerRev + (!isNaN(item.price) ? item.price : 0);
      totalSold = totalSold + (!isNaN(item.sold) ? item.sold : 0);
      inStock =
        inStock +
        (!isNaN(item.quantity)
          ? item.quantity
          : 0 - !isNaN(item.sold)
          ? item.sold
          : 0);

      if (item.sold > 0) {
        totalCustomers = totalCustomers + 1;
      }
    });

    if (v === "SR") {
      return sellerRev;
    }

    if (v === "TC") {
      return totalCustomers;
    }

    if (v === "TS") {
      return totalSold;
    }

    if (v === "IS") {
      return inStock;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="overviewContainer">
          <h1>Overview</h1>
          <div className="overviewHeader">
            <DashBoardOverviewCard
              title="Revenue"
              value={this.getOverviewData("SR")}
            />
            <DashBoardOverviewCard
              title="Customers"
              value={this.getOverviewData("TC")}
            />
            <DashBoardOverviewCard
              title="Sold"
              value={this.getOverviewData("TS")}
            />
            <DashBoardOverviewCard
              title="In Stock"
              value={this.getOverviewData("IS")}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboardOverview;
