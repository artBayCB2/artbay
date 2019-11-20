import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css";

class UnconnectedNavBar extends Component {
  searchHandler = evt => {};

  selectHandler(evt) {
    this.props.dispatch({
      type: "change-NavBar-Value",
      value: evt.target.value
    });
  }

  render() {
    return (
      <div className="Navbar-navbar">
        <Link to={"/"}>
          <img className="Navbar-logo" src="../Logo2.png" />
        </Link>
        <div className="Navbar-dropdown">
          <button class="Navbar-dropbtn">
            Shop
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="Navbar-custom-select">
            <select value={this.props.value} onChange={this.selectHandler}>
              <option value="painting">Painting</option>
              <option value="photography">Photography</option>
              <option value="drawing">Drawing</option>
              <option value="sculpture">Sculpture</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <div class="Navbar-search-container">
          <form onSubmit={this.searchHandler}>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div>
          {this.props.loggedIn ? (
            <div>
              <Link to="/sell">
                <button>
                  <img src="/images/websiteAssets/shop_Vector.png"></img>
                  Sell
                </button>
              </Link>
              <div>
                <Link>
                  <img src="/images/websiteAssets/shop_Vector.png"></img>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/signup">Signup</Link>
              </div>
              <div>
                <Link to="/cart">Cart</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn, value: state.searchValue };
};
let NavBar = connect(mapStateToProps)(UnconnectedNavBar);

export default NavBar;
