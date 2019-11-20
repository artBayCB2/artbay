import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUp.css";
import { Link } from "react-router-dom";

class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleSignUpEmail = event => {
    console.log("handleSignUpEmail", event.target.value);
    this.setState({ username: event.target.value });
  };
  handleSignUpPassword = event => {
    console.log("handleSignUpPassword", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSignUpSubmit = async () => {
    event.preventDefault();
    console.log("handleSignUpSubmit");
    let data = new FormData();
    let email = this.state.email;
    let password = this.state.password;
    data.append("email", email);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body.success);
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
      <React.Fragment>
        <div className="container">
          <div className="leftChildContainer">
            <img className="logo" src="../Logo2.png" />
            <h3>Discover a collection of unique and stylish artwork</h3>
            <div style={{ paddingLeft: "100px" }}>
              <h5>Find various artwork to reinvent your home with style</h5>
              <h5>
                Explore a wide selection of work from artiest around the world
              </h5>
            </div>
          </div>
          <div className="rightChildContainer">
            <form onSubmit={this.handleSignUpSubmit}>
              <h4>Join ArtBay</h4>
              <div>
                <h6>Email</h6>
                <input
                  className="signUpInputText"
                  type="text"
                  onChange={this.handleSignUpUsername}
                  placeholder="email"
                />
              </div>
              <div>
                <h6>Password</h6>
                <input
                  className="signUpInputText"
                  type="password"
                  onChange={this.handleSignUpPassword}
                  placeholder="password"
                />
              </div>
              <div>
                <h6>Confirm Password</h6>
                <input
                  className="signUpInputText"
                  type="password"
                  onChange={this.handleSignUpPassword}
                  placeholder="password"
                />
              </div>
              <div>
                <button className="signUpButton" type="submit">
                  Create Account
                </button>
              </div>
              <div className="loginHere">
                Already have an account? <Link to={"/login/"}>login here</Link>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  };
}

let SignUp = connect()(UnconnectedSignUp);
export default SignUp;
