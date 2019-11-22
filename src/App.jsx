import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";
import NavBar from "./NavBar.jsx";
import HeroImage from "./HeroImage.jsx";
import submitSellerDetails from "./submitSellerDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SellerProfileDetails from "./SellerProfileDetails.jsx";

class App extends Component {
  render = () => {
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
            path="/seller-profile-details"
            component={SellerProfileDetails}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
