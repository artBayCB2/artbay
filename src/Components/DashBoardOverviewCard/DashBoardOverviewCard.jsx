import React, { Component } from "react";
import "./DashBoardOverviewCard.css";

export class DashBoardOverviewCard extends Component {
  render() {
    return (
      <div className="dashBoardOverviewCard-container ">
        <div className="dashBoardOverviewCard-title">{this.props.title}</div>
        <div className="dashBoardOverviewCard-value">{this.props.value}</div>
      </div>
    );
  }
}

export default DashBoardOverviewCard;
