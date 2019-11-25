import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css";
import CartBag from "./Components/CartBag/CartBag.jsx";

class UnconnectedNavBar extends Component {
  searchHandler = evt => {
    this.props.dispatch({
      type: "change-NavBar-SearchValue",
      value: evt.target.value
    });
  };

  selectHandler = evt => {
    this.props.dispatch({
      type: "change-NavBar-Value",
      value: evt.target.value
    });
  };

  render() {
    console.log(this.props.loggedIn);
    return (
      <div className="navbar-row">
        <div className="navbar-left-elements">
          <div>
            <Link to={"/"}>
              <img
                // style={{ paddingTop: "10px" }}
                height="60px"
                width="60px"
                src="../assets/Logo1.png"
              />
            </Link>
          </div>
          <div className="navbar-search-bar">
            <div
              style={{
                width: "30%",
                borderRight: "1px solid rgba(53, 79, 139, 0.5)"
              }}
            >
              <select value={this.props.value} onChange={this.selectHandler}>
                <option value="All">All Art</option>
                <option value="Paintings">Paintings</option>
                <option value="Photography">Photography</option>
                <option value="Drawings">Drawings</option>
                <option value="Sculpture">Sculpture</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              onChange={this.searchHandler}
            />
            <img height="15px" width="18px" src="../assets/SearchIcon.png" />
          </div>
        </div>

        <div className="navbar-right-elements">
          {!this.props.loggedIn && (
            <div>
              <Link className="navbar-LoginSignUp" to="/login">
                Login
              </Link>
            </div>
          )}
          {!this.props.loggedIn && (
            <div>
              <Link className="navbar-LoginSignUp" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
          {this.props.loggedIn && (
            <div>
              <Link to="/seller-profile">
                <button className="navbar-buttons">
                  <img src="/assets/ShopVector.png"></img>
                  Sell Your Art
                </button>
              </Link>
            </div>
          )}

          <div>
            <Link to="/cart">
              <CartBag />
            </Link>
          </div>
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
