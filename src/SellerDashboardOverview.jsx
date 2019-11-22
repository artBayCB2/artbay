import React, { Component } from "react";

class SellerDashboardOverview extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div>Revenue</div>
          <div>Number of Customers</div>
          <div>Number of Items Sold</div>
          <div>Number of Items in Stock</div>
        </div>
      </React.Fragment>
    );
  }
}

export default SellerDashboardOverview;
