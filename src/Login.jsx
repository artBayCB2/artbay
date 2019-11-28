import React, { Component } from "react";
import { connect } from "react-redux";
import "./Login.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  handleLoginEmail = event => {
    console.log("handleLoginUsername", event.target.value);
    this.setState({ email: event.target.value, error: "" });
  };
  handleLoginPassword = event => {
    console.log("handleLoginPassword", event.target.value);
    this.setState({ password: event.target.value, error: "" });
  };
  handleLoginSubmit = async event => {
    event.preventDefault();
    console.log("handleLoginSubmit", event.target.value);
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ error: body.message });
      return;
    }

    if (body.success) {
      this.props.dispatch({
        type: "login-success",
        value: body.userIsSeller
      });
      this.props.dispatch({
        type: "update-profile-img",
        value: body.profileImageURL
      });
      this.props.history.push("/");
      return;
    }
  };
  render = () => {
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-header-row">
            <div
              style={{ width: "60%", lineHeight: "1", marginBottom: "30px" }}
            >
              <h3>Welcome Back</h3>
              <span
                style={{
                  fontSize: "10px",
                  color: "#ACB5BB"
                }}
              >
                Login to a world of quality and authentic art
              </span>
            </div>
            <Link to={"/"}>
              <img height="60px" width="60px" src="../assets/Logo1.png" />
            </Link>
          </div>
          <form onSubmit={this.handleLoginSubmit}>
            <div>
              Email
              <input
                className="login-inputbox"
                placeholder="enter your email"
                type="email"
                onChange={this.handleLoginEmail}
              />
            </div>
            <div>
              Password
              <input
                className="login-inputbox"
                placeholder="enter password"
                type="password"
                onChange={this.handleLoginPassword}
              />
            </div>
            <p class="login-error">{this.state.error}</p>
            <div>
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="login-signuplink">
            Don't have an account? <Link to={"/signup"}>Sign Up here</Link>
          </div>
        </div>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);
export default withRouter(Login);
