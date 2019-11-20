import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PersonalDetails from "./PersonalDetails.jsx";
import PaymentDetails from "./PaymentDetails.jsx";

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/signup/" component={SignUp} />
          <Route exact={true} path="/login/" component={Login} />
          <Route
            exact={true}
            path="/personaldetails/"
            component={PersonalDetails}
          />
          <Route
            exact={true}
            path="/paymentdetails/"
            component={PaymentDetails}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
