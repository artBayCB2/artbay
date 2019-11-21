import React, { Component } from "react";
import { connect } from "react-redux";
import ArtCard from "./ArtCard.jsx";

class UnconnectedItemsList extends Component {
  searchType = () => {};

  render() {
    return (
      <>
        {searchType().map(artCard => {
          <ArtCard art={artCard}></ArtCard>;
        })}
      </>
    );
  }
}

let mapStateToProps = state => {
  return {
    searchValue: state.searchValue
  };
};

let ItemsList = connect(mapStateToProps)(UnconnectedItemsList);

export default ItemsList;
