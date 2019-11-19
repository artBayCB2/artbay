import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  searchHandler = evt => {};

  render() {
    return (
      <div className="navbar">
        <Link to={"/"}>
          <img className="logo" src="../Logo2.png" />
        </Link>
        <div className="dropdown">
          <button class="dropbtn">
            Shop
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <div class="header">
              <h2>Shop now</h2>
            </div>
            <div class="row">
              <div class="column">
                <h3>Category</h3>
                <Link to="/searchCategory/painting"> Painting</Link>
                <Link to="/searchCategory/photography"> Photography</Link>
                <Link to="/searchCategory/drawing"> Drawing</Link>
                <Link to="/searchCategory/sculpture"> Sculpture</Link>
              </div>
              <div class="column">
                <h3>Subject</h3>
                <Link to="/searchSubject/landscapes"> Landscapes</Link>
                <Link to="/searchSubject/abstracts"> Abstracts</Link>
                <Link to="/searchSubject/PeopleAndPortraits">
                  People and portraits
                </Link>
                <Link to="/searchSubject/ArchitectureAndCities">
                  Architecture and cities
                </Link>
              </div>
              <div class="column">
                <h3>Budget</h3>
                <Link to="/searchBudget/under100">$100 and under</Link>
                <Link to="/searchBudget/under500">$500 and under</Link>
                <Link to="/searchBudget/under1000">$1000 and under</Link>
                <Link to="/searchBudget/over1000">$1000 and over</Link>
              </div>
            </div>
          </div>
        </div>
        <div class="search-container">
          <form onSubmit={this.searchHandler}>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
