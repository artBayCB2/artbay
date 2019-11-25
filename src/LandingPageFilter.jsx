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
    let _activeButtonStyle = {
      backgroundColor: "#354f8b",
      color: "#ffffff"
    };

    let _inActiveButtonStyle = {
      backgroundColor: "transparent",
      color: "#354f8b"
    };

    return (
      <div className="pageFilter-Row">
        <button
          className="painting-btn"
          style={
            this.props.searchValue === "All"
              ? _activeButtonStyle
              : _inActiveButtonStyle
          }
          onClick={() => this.changeSearchValue("All")}
        >
          All Art
        </button>
        <button
          className="painting-btn"
          style={
            this.props.searchValue === "Paintings"
              ? _activeButtonStyle
              : _inActiveButtonStyle
          }
          onClick={() => this.changeSearchValue("Paintings")}
        >
          Painting
        </button>

        <button
          className="photography-btn"
          style={
            this.props.searchValue === "Photography"
              ? _activeButtonStyle
              : _inActiveButtonStyle
          }
          onClick={() => this.changeSearchValue("Photography")}
        >
          Photography
        </button>
        <button
          className="drawing-btn"
          style={
            this.props.searchValue === "Drawings"
              ? _activeButtonStyle
              : _inActiveButtonStyle
          }
          onClick={() => this.changeSearchValue("Drawings")}
        >
          Drawing
        </button>

        <button
          className="sculpture-btn"
          style={
            this.props.searchValue === "Sculpture"
              ? _activeButtonStyle
              : _inActiveButtonStyle
          }
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
