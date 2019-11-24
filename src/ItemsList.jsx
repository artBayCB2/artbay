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
    let _column1 = [];
    let _column2 = [];
    let _column3 = [];
    let _column4 = [];

    for (let i = 0; i < this.state.posts.length; i++) {
      if (i % 0) {
        _column1.push(this.state.posts[i]);
      }
      if (i % 1) {
        _column2.push(this.state.posts[i]);
      }
      if (i % 2) {
        _column3.push(this.state.posts[i]);
      }
      if (i % 3) {
        _column4.push(this.state.posts[i]);
      }
    }

    console.log(
      _column1.length,
      _column2.length,
      _column3.length,
      _column4.length
    );

    return (
      <div className="artlists-rows ">
        {this.state.posts.map(artCard => {
          return (
            <div>
              <ArtCard className="rrr" art={artCard} />
            </div>
          );
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
