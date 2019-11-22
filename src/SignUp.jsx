import React, { Component } from "react";
import { connect } from "react-redux";
import "./SignUp.css";
import { Link } from "react-router-dom";

class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleSignUpEmail = event => {
    console.log("handleSignUpEmail", event.target.value);
    this.setState({ email: event.target.value });
  };
  handleSignUpPassword = event => {
    console.log("handleSignUpPassword", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSignUpConfirmPassword = event => {
    console.log("handleSignUpConfirmPassword", event.target.value);
    this.setState({ confirmPassword: event.target.value });
  };
  handleSignUpSubmit = async () => {
    event.preventDefault();
    if (
      !this.state.email.includes("@") ||
      !this.state.email.includes(".com") ||
      this.state.email.length < 3
    ) {
      return alert("Invalid Email");
    }
    if (
      this.state.password < 5 ||
      this.state.password !== this.state.confirmPassword
    ) {
      return alert("Invalid Password or Password Match in Valid");
    }

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
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      return;
    }
    this.props.dispatch({
      type: "signup-success"
    });
  };

  render = () => {
    return (
      <div className="container">
        <div className="leftChildContainer">
          <img height="60px" width="60px" src="../assets/Logo1.png" />
          <h3 style={{ fontSize: "25px" }}>
            Discover a collection of unique and stylish artwork
          </h3>
          <div style={{ padding: "30px 0 0 30px" }}>
            <div className="row">
              <img height="20px" width="30px" src="../assets/CheckMark.png" />
              <h5>Find various artwork to reinvent your home with style</h5>
            </div>
            <div className="row">
              <img height="20px" width="30px" src="../assets/CheckMark.png" />
              <h5>
                Explore a wide selection of work from artiest around the world
              </h5>
            </div>
          </div>
        </div>
        <div className="rightChildContainer">
          <form onSubmit={this.handleSignUpSubmit}>
            <h3 style={{ color: "#354f8b", marginBottom: "40px" }}>
              Join ArtBay
            </h3>
            <div>
              <h6>Email</h6>
              <input
                className="signUpInputText"
                type="text"
                onChange={this.handleSignUpEmail}
                placeholder="enter your email"
              />
            </div>
            <div>
              <h6>Password</h6>
              <input
                className="signUpInputText"
                type="password"
                onChange={this.handleSignUpPassword}
                placeholder="choose password"
              />
            </div>
            <div>
              <h6>Confirm Password</h6>
              <input
                className="signUpInputText"
                type="password"
                onChange={this.handleSignUpConfirmPassword}
                placeholder="confirm password"
              />
            </div>
            <div>
              <button className="signUpButton" type="submit">
                Create Account
              </button>
            </div>
            <div className="loginHere">
              Already have an account? <Link to={"/login"}>login here</Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

let SignUp = connect()(UnconnectedSignUp);
export default SignUp;
