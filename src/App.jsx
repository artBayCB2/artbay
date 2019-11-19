import React, { Component } from "react";
import SignUp from "./SignUp.jsx";

class App extends Component {
  render = () => {
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
    );
  };
}

export default App;
