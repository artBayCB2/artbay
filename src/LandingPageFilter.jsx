import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedlandingPageFilter extends Component {
  changeSearchValue = value => {
    this.props.dispatch({
      type: "change-NavBar-Value",
      searchValue: value
    });
  };

  render() {
    return (
      <div className="PageFilterRec">
        <button
          className="painting-btn"
          onClick={this.changeSearchValue("Painting")}
        >
          Painting
        </button>

        <button
          className="photography-btn"
          onClick={this.changeSearchValue("Photography")}
        >
          Photography
        </button>
        <button
          className="drawing-btn"
          onClick={this.changeSearchValue("Drawing")}
        >
          Drawing
        </button>

        <button
          className="sculpture-btn"
          onClick={this.changeSearchValue("Sculpture")}
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
