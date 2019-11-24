import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./LandingPageFilter.css";

class UnconnectedlandingPageFilter extends Component {
  changeSearchValue = value => {
    console.log(value);
    this.props.dispatch({
      type: "change-NavBar-Value",
      value: value
    });
  };

  render() {
    return (
      <div className="pageFilter-Row">
        <button
          className="painting-btn"
          onClick={() => this.changeSearchValue("All")}
        >
          All Art
        </button>
        <button
          className="painting-btn"
          onClick={() => this.changeSearchValue("Paintings")}
        >
          Painting
        </button>

        <button
          className="photography-btn"
          onClick={() => this.changeSearchValue("Photography")}
        >
          Photography
        </button>
        <button
          className="drawing-btn"
          onClick={() => this.changeSearchValue("Drawings")}
        >
          Drawing
        </button>

        <button
          className="sculpture-btn"
          onClick={() => this.changeSearchValue("Sculpture")}
        >
          Sculpture
        </button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn, searchValue: state.searchValue };
};
let LandingPageFilter = connect(mapStateToProps)(UnconnectedlandingPageFilter);

export default LandingPageFilter;
