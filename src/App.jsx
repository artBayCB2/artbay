import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";

let renderSignUp = () => {
  return (
    <div>
      <SignUp />
    </div>
  );
};

let renderLogin = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderSignUp} />
          <Route exact={true} path="/login/" render={renderLogin} />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
