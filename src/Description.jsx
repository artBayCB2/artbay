import React, { Component } from "react";
import "./Description.css";

export default class Description extends Component {
  render() {
    return <p className="description-p">{this.props.description}</p>;
  }
}
