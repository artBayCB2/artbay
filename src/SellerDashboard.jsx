import React, { Component } from "react";
import SellerDashboardOverview from "./SellerDashboardOverview.jsx";

class SellerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artworks: []
    };
  }
  componentDidMount = () => {
    this.refresh();
  };
  refresh = async () => {
    let response = await fetch("/this-seller-art");
    let body = await response.text();
    console.log("body", body);
    body = JSON.parse(body);
    this.setState({ artworks: body.artItems });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <SellerDashboardOverview />
        </div>
        <div>
          {this.state.artworks.map(artwork => {
            console.log(artwork);
          })}
        </div>
        <button onClick={this.refresh}>Refresh</button>
      </React.Fragment>
    );
  }
}

export default SellerDashboard;
