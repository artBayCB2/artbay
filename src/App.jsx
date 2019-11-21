import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PersonalDetails from "./PersonalDetails.jsx";

let renderSignUp = () => {
  return <SignUp />;
};

let renderLogin = () => {
  return <Login />;
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderSignUp} />
          <Route exact={true} path="/login" render={renderLogin} />
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
