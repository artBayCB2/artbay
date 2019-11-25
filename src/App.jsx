import React, { Component, Suspense, lazy } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";

import NavBar from "./NavBar.jsx";
import LandingPageFilter from "./LandingPageFilter.jsx";
import HeroImage from "./HeroImage.jsx";
import submitSellerDetails from "./submitSellerDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SellerProfileDetails from "./SellerProfileDetails.jsx";
import SellerDashboard from "./SellerDashboard.jsx";

import ArtistCollection from "./ArtistCollection.jsx";
import ItemsList from "./ItemsList.jsx";
import ArtDetails from "./ArtDetails.jsx";

let renderSignUp = () => {
  return (
    <>
      <SignUp></SignUp>
    </>
  );
};

let renderLogin = () => {
  return (
    <>
      <Login></Login>
    </>
  );
};

let renderLandingPage = () => {
  return (
    <>
      <HeroImage></HeroImage>
      <LandingPageFilter></LandingPageFilter>

      <ItemsList />
    </>
  );
};

let renderArtUpload = () => {
  return <ArtUpload />;
};

let renderArtDetail = rd => {
  let artId = rd.match.params.artID;

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ArtDetails artID={artId}></ArtDetails>;
    </Suspense>
  );
};

let renderArtistCollection = rd => {
  let artistName = rd.match.params.artistName;
  return <ArtistCollection artist={artistName}></ArtistCollection>;
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <NavBar></NavBar>
        <div>
          <Route exact={true} path="/" component={renderLandingPage} />
          <Route exact={true} path="/signup" component={renderSignUp} />
          <Route exact={true} path="/login" component={renderLogin} />
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
          {/* <Route
            exact={true}
            path="/seller-profile"
            component={SellerProfile}
          /> */}
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

export default App;
