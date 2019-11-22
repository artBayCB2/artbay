import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css";

class UnconnectedNavBar extends Component {
  searchHandler = evt => {};

  selectHandler = evt => {
    this.props.dispatch({
      type: "change-NavBar-Value",
      value: evt.target.value
    });
  };

  render() {
    return (
      <div className="Navbar-navbar">
        <Link to={"/"}>
          <img className="Navbar-logo" src="../assets/NavLogo.png" />
        </Link>
        <div className="Navbar-dropdown">
          <div className="Navbar-custom-select">
            <select value={this.props.value} onChange={this.selectHandler}>
              <option value="Paintings">Paintings</option>
              <option value="Photography">Photography</option>
              <option value="Drawings">Drawings</option>
              <option value="Sculpture">Sculpture</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div className="Navbar-search-container">
          <form onSubmit={this.searchHandler}>
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div>
          {this.props.loggedIn ? (
            <div>
              <Link to="/sell">
                <button>
                  <img src="/assets/ShopVector.png"></img>
                  Sell
                </button>
              </Link>
              <div>
                <Link to="/cart">
                  <img src="/assets/ShopVector.png"></img>
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
                <Link to="/cart">
                  <img src="/assets/ShopVector.png"></img>
                </Link>
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
