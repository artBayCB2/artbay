import React, { Component } from "react";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: []
    };
  }

  refresh = async () => {
    let response = await fetch("/all-art");
    let body = await response.text();
    console.log("body", body);
    body = JSON.parse(body);
    this.setState({ artworks: body.artistCollect });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <SellerDashboardOverview />
        </div>
        <button onClick={this.refresh}>Refresh</button>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
