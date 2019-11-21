import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
<<<<<<< Updated upstream
import ArtUpload from "./ArtUpload.jsx";
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

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <NavBar></NavBar>

        <div>
          <Route exact={true} path="/" render={renderLandingPage} />
          <Route exact={true} path="/signup" render={renderSignUp} />
          <Route exact={true} path="/login" render={renderLogin} />
          <Route exact={true} path="/artupload" render={renderArtUpload} />
          <Route
            exact={true}
            path="/seller-profile"
            render={() => <PersonalDetails />}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
