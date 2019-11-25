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
import { connect } from "react-redux";

let renderArtDetail = rd => {
  let artId = rd.match.params.artID;

  return <ArtDetails artID={artId}></ArtDetails>;
};

let renderArtistCollection = rd => {
  let artistName = rd.match.params.artistName;
  return <ArtistCollection artist={artistName}></ArtistCollection>;
};
class UnconnectedApp extends Component {
  searchType = async () => {
    let response = await fetch("/check-status");
    let body = await response.text();

    body = JSON.parse(body);

    console.log("body", body);

    if (body.loggedIn) {
      this.props.dispatch({
        type: "login-success"
      });
    }
  };

  render = () => {
    this.searchType();
    return (
      <BrowserRouter>
        <NavBar></NavBar>
        <div>
          <Route exact={true} path="/" component={LandingPage} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/artupload" component={ArtUpload} />
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
