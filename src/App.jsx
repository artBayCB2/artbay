import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ArtUpload from "./ArtUpload.jsx";

let renderSignUp = () => {
  return <SignUp />;
};

let renderLogin = () => {
  return <Login />;
};

let renderArtUpload = () => {
  return <ArtUpload />;
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderSignUp} />
          <Route exact={true} path="/login" render={renderLogin} />
          <Route exact={true} path="/artupload" render={renderArtUpload} />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
