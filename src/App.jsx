import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";

import NavBar from "./NavBar.jsx";
import LandingPage from "./LandingPageFilter.jsx";
import HeroImage from "./HeroImage.jsx";
<<<<<<< HEAD
import submitSellerDetails from "./submitSellerDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SellerProfileDetails from "./SellerProfileDetails.jsx";
import SellerDashboard from "./SellerDashboard.jsx";
import ItemsList from "./ItemsList.jsx";
import ArtDetails from "./ArtDetails.jsx";
import ArtistCollection from "./ArtistCollection.jsx";

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
      <ItemsList />
    </>
  );
};

let renderArtUpload = () => {
  return <ArtUpload />;
};

let renderArtDetail = rd => {
  let artId = rd.match.params.artID;

  return <ArtDetails artID={artId}></ArtDetails>;
};

let renderArtistCollection = rd => {
  let artistName = rd.match.params.artistName;
  return <ArtistCollection artist={artistName}></ArtistCollection>;
};
=======
import SellerProfile from "./SellerProfile.jsx";
>>>>>>> 8e17b066cdc302aa989dd2f4fedc5ca8b7eb074d

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <NavBar></NavBar>
        <div>
          <Route exact={true} path="/" component={renderLandingPage} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/artupload" component={ArtUpload} />
          <Route
            exact={true}
<<<<<<< HEAD
            path="/seller-dashboard"
            component={SellerDashboard}
          />
          <Route
            exact={true}
            path="/submit-seller-details"
            component={submitSellerDetails}
          />
          <Route
            exact={true}
            path="/seller-payment-details"
            component={SellerPaymentDetails}
          />
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
            path="/seller-profile-details"
            component={SellerProfileDetails}
=======
            path="/seller-profile"
            component={SellerProfile}
>>>>>>> 8e17b066cdc302aa989dd2f4fedc5ca8b7eb074d
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
