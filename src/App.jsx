import React, { Component, Suspense, lazy } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";
import NavBar from "./NavBar.jsx";
import SellerDashboard from "./SellerDashboard.jsx";
import ArtistCollection from "./ArtistCollection.jsx";
import ArtDetails from "./ArtDetails.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import SellerProfile from "./SellerProfile.jsx";
import CartDropDown from "./CartDropDown.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

let renderArtDetail = rd => {
  let artId = rd.match.params.artID;

  return <ArtDetails artID={artId}></ArtDetails>;
};

let renderArtistCollection = rd => {
  let artistName = rd.match.params.artistName;
  return <ArtistCollection artist={artistName}></ArtistCollection>;
};
class UnconnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount = () => {
    this.checkStatus();
  };

  checkStatus = async () => {
    console.log("466466444");
    let response = await fetch("/check-status");
    let body = await response.text();

    body = JSON.parse(body);

    console.log(body.cart);

    if (body.loggedIn) {
      this.props.dispatch({
        type: "login-success"
      });

      this.props.dispatch({
        type: "update-profile-img",
        value: body.profileImageURL
      });

      this.props.dispatch({
        type: "update-cart",
        value: body.cart
      });
    }

    this.setState({ loading: false });
  };

  render = () => {
    console.log("dasddssadsdasd");
    return this.state.loading ? (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        styles={{
          wrapper: {
            width: "400px",
            height: "400px",
            overflow: this.state.loading ? "hidden" : "scroll"
          }
        }}
      ></LoadingOverlay>
    ) : (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={LandingPage} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/artupload" component={ArtUpload} />
          <Route exact={true} path="/cart" component={ShoppingCart} />
          <Route
            exact={true}
            path="/artistCollection/:artistName"
            component={renderArtistCollection}
          />
          <Route
            exact={true}
            path="/artDetails/:artID"
            render={renderArtDetail}
          />
          <Route
            exact={true}
            path="/seller-profile"
            component={SellerProfile}
          />
          <Route
            exact={true}
            path="/seller-dashboard/"
            component={SellerDashboard}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let App = connect()(UnconnectedApp);

export default App;
