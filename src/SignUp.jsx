import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUp.css";

class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSignUpUsername = event => {
    console.log("handleSignUpUsername", event.target.value);
    this.setState({ username: event.target.value });
  };
  handleSignUpPassword = event => {
    console.log("handleSignUpPassword", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSignUpSubmit = async event => {
    event.preventDefault();
    console.log("handleSignUpSubmit", event.target.value);
    let body = { success: true };
    if (!body.success) {
      alert("Unsuccessful SignUp");
      return;
    }
    if (body.success) {
      alert("Successful SignUp");
      return;
    }
    this.props.dispatch({
      type: "signup-success"
    });
  };

  render = () => {
    return (
      <div className="Register">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSignUpSubmit}>
          <div>
            Username
            <input type="text" onChange={this.handleSignUpUsername} />
          </div>
          <div>
            Password
            <input type="text" onChange={this.handleSignUpPassword} />
          </div>
          <div>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  };
}

let SignUp = connect()(UnconnectedSignUp);
export default SignUp;
