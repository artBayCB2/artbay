import React, { Component } from "react";

class SellerDashboardOverview extends Component {
  componentDidMount = () => {
    let updatedDashboardOverview = async () => {
      let response = await fetch("/");
      let responseBody = await response.text();
      console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      this.props.dispatch({
        type: "dashboard-overview",
        dashboardOverview: parsed
      });
    };
  };

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
