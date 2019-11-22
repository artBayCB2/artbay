import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
<<<<<<< Updated upstream
import ArtUpload from "./ArtUpload.jsx";
<<<<<<< Updated upstream
import PersonalDetails from "./PersonalDetails.jsx";
=======
import NavBar from "./NavBar.jsx";
import HeroImage from "./HeroImage.jsx";
>>>>>>> Stashed changes

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
  return <></>;
};

let renderArtUpload = () => {
  return <ArtUpload />;
};
=======
import submitSellerDetails from "./submitSellerDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SellerProfileDetails from "./SellerProfileDetails.jsx";
>>>>>>> Stashed changes

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <NavBar></NavBar>

        <div>
<<<<<<< Updated upstream
          <Route exact={true} path="/" render={renderLandingPage} />
          <Route exact={true} path="/signup" render={renderSignUp} />
          <Route exact={true} path="/login" render={renderLogin} />
          <Route exact={true} path="/artupload" render={renderArtUpload} />
=======
          <Route exact={true} path="/" component={SignUp} />
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
>>>>>>> Stashed changes
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
