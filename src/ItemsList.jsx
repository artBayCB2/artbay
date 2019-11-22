import React, { Component } from "react";
import { connect } from "react-redux";
import ArtCard from "./ArtCard.jsx";
import "./Itemslist.css";

class UnconnectedItemsList extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount = () => {
    this.searchType();
  };

  componentDidUpdate = () => {
    this.searchType();
  };

  searchType = async () => {
    let response = await fetch("/all-art");
    let body = await response.text();

    body = JSON.parse(body);
    console.log("test", body.message);

    let artItemsByValue = body.message.filter(art => {
      if (this.props.searchValue === "All") {
        return art;
      }

      return art.category === this.props.searchValue;
    });

    if (this.state.posts.length !== artItemsByValue.length) {
      this.setState({ posts: artItemsByValue });
    }
  };

  render() {
    return (
      <div className="artlists">
        {this.state.posts.map(artCard => {
          {
            console.log(artCard);
          }
          return <ArtCard art={artCard}></ArtCard>;
        })}
      </div>
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
