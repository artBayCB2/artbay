import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PersonalDetails from "./PersonalDetails.jsx";
import PaymentDetails from "./PaymentDetails.jsx";

class App extends Component {
  render = () => {
<<<<<<< HEAD
    // return <SignUp />;
    return (
      <React.Fragment>
        <form
          action="/seller-profile"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="text" name="firstName"></input>
          <input type="text" name="lastName"></input>
          <input type="file" name="profile-image"></input>
          <input type="submit"></input>
        </form>
      </React.Fragment>
=======
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
>>>>>>> 413ae50fc51b1cdb5a0bf804a6857ece3346010c
    );
  };
}

export default App;
