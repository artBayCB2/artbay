import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";
import NavBar from "./NavBar.jsx";
<<<<<<< Updated upstream
import submitSellerDetails from "./submitSellerDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SellerProfileDetails from "./SellerProfileDetails.jsx";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
=======
import LandingPage from "./LandingPageFilter.jsx";
>>>>>>> Stashed changes
import HeroImage from "./HeroImage.jsx";
import SellerDashboard from "./SellerDashboard.jsx";
import ItemsList from "./ItemsList.jsx";
import ArtDetails from "./ArtDetails.jsx";
import ArtistCollection from "./ArtistCollection.jsx";
import SellerProfile from "./SellerProfile.jsx";

let renderArtDetail = rd => {
  let artId = rd.match.params.artID;

  return <ArtDetails artID={artId}></ArtDetails>;
};

let renderArtistCollection = rd => {
  let artistName = rd.match.params.artistName;
  return <ArtistCollection artist={artistName}></ArtistCollection>;
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
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
            path="/seller-dashboard"
            component={SellerDashboard}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
