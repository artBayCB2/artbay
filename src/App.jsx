import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";
import NavBar from "./NavBar.jsx";
import LandingPage from "./LandingPageFilter.jsx";
import HeroImage from "./HeroImage.jsx";
import SellerProfile from "./SellerProfile.jsx";

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
            path="/seller-profile"
            component={SellerProfile}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
