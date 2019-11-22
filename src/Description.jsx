import React, { Component } from "react";

export default class Description extends Component {
  render() {
    return (
      <>
        <p>{this.props.description}</p>
      </>
    );
  }
}
