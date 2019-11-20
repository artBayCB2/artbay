import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedlandingPageFilter extends Component {
  changeSearchValue = value => {
    this.props.dispatch({
      type: "change-NavBar-Value",
      value: value
    });
  };

  render() {
    return (
      <div className="PageFilterRec">
        <button onClick={this.changeSearchValue("Painting")}>Painting</button>
        <button onClick={this.changeSearchValue("Photography")}>
          Photography
        </button>
        <button onClick={this.changeSearchValue("Drawing")}>Drawing</button>
        <button onClick={this.changeSearchValue("Sculpture")}>Sculpture</button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn, value: state.searchValue };
};
let LandingPageFilter = connect(mapStateToProps)(UnconnectedlandingPageFilter);

export default LandingPageFilter;
