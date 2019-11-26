import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css";
import CartBag from "./Components/CartBag/CartBag.jsx";
import { withRouter } from "react-router-dom";

class UnconnectedNavBar extends Component {
  constructor() {
    super();
    this.state = {
      logout: false
    };
  }
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

  showLogout = () => {
    let _logout = this.state.logout;
    this.setState({ logout: !_logout });
  };

  logoutUser = async () => {
    this.showLogout();
    let response = await fetch("/logout");
    let body = await response.text();

    body = JSON.parse(body);

    if (body.success) {
      this.props.dispatch({
        type: "logout"
      });
      this.props.dispatch({
        type: "set-nav-DashB",
        value: false
      });

      this.props.dispatch({
        type: "set-nav-SellB",
        value: false
      });

      this.props.dispatch({
        type: "set-nav-shopB",
        value: true
      });

      this.props.dispatch({
        type: "set-nav-uploadB",
        value: false
      });

      this.props.dispatch({
        type: "set-nav-searchB",
        value: true
      });

      this.props.dispatch({
        type: "set-nav-cartB",
        value: true
      });

      this.props.history.push("/");
      window.location.reload(false);
    } else {
      alert("Something went wrong, try again!");
    }
  };

  render() {
    return (
      <React.Fragment>
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
            {this.props.navSearchBar && (
              <div className="navbar-search-bar">
                <div
                  style={{
                    width: "30%",
                    borderRight: "1px solid rgba(53, 79, 139, 0.5)"
                  }}
                >
                  <select
                    value={this.props.value}
                    onChange={this.selectHandler}
                  >
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
                <img
                  height="15px"
                  width="18px"
                  src="../assets/SearchIcon.png"
                />
              </div>
            )}
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

            {this.props.loggedIn && this.props.navUploadButton && (
              <div>
                <Link to="/artupload">
                  <button className="navbar-buttons">
                    <img src="/assets/AnalyticsVector.png"></img>
                    Upload
                  </button>
                </Link>
              </div>
            )}

            {this.props.loggedIn && this.props.navDashBoardButton && (
              <div>
                <Link to="/seller-dashboard">
                  <button className="navbar-buttons">
                    <img src="/assets/AnalyticsVector.png"></img>
                    Dashboard
                  </button>
                </Link>
              </div>
            )}
            {this.props.loggedIn && this.props.NavSellButton && (
              <div>
                <Link to="/seller-profile">
                  <button className="navbar-buttons">
                    <img src="/assets/ShopVector.png"></img>
                    Sell Your Art
                  </button>
                </Link>
              </div>
            )}
            {this.props.loggedIn && this.props.navShopButton && (
              <div>
                <Link to="/">
                  <button className="navbar-buttons">
                    <img src="/assets/ShopVector.png"></img>
                    Shop
                  </button>
                </Link>
              </div>
            )}
            {this.props.NavCartBag && (
              <div className="navbar-cart">
                <Link to="/cart">
                  <CartBag />
                </Link>
              </div>
            )}
            <div className="navbar-profile-image-container">
              {this.props.loggedIn && (
                <img
                  onClick={this.showLogout}
                  style={{ cursor: "pointer", marginLeft: "50px" }}
                  height="40px"
                  src={this.props.profileImageURL}
                />
              )}
            </div>
          </div>
        </div>
        {this.state.logout && (
          <div className="navbar-logout-modal">
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    value: state.searchValue,
    profileImageURL: state.profileImageURL,
    navSearchBar: state.navSearchBar,
    navShopButton: state.navShopButton,
    navDashBoardButton: state.navDashBoardButton,
    navUploadButton: state.navUploadButton,
    NavSellButton: state.NavSellButton,
    NavCartBag: state.NavCartBag
  };
};
let NavBar = connect(mapStateToProps)(UnconnectedNavBar);

export default withRouter(NavBar);

// this.props.dispatch({
//   type: "set-nav-DashB",
//   value: false
// });

// this.props.dispatch({
//   type: "set-nav-SellB",
//   value: false
// });

// this.props.dispatch({
//   type: "set-nav-shopB",
//   value: false
// });

// this.props.dispatch({
//   type: "set-nav-uploadB",
//   value: false
// });

// this.props.dispatch({
//   type: "set-nav-searchB",
//   value: false
// });

// this.props.dispatch({
//   type: "set-nav-cartB",
//   value: false
// });
