import React, { Component } from "react";

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
    this.setState({ artworks: body.artItems });
  };

  render() {
    return (
      <div>
        <button onClick={this.refresh}>Refresh</button>
        <div>
          {this.state.artworks.map(artwork => {
            //need to create another component (artwork)
          })}
        </div>
      </div>
    );
  }
}

export default SellerDashboard;
