import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleLoginUsername = event => {
    console.log("handleLoginUsername", event.target.value);
    this.setState({ email: event.target.value });
  };
  handleLoginPassword = event => {
    console.log("handleLoginPassword", event.target.value);
    this.setState({ password: event.target.value });
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
      alert(body.message);
      return;
    }
    if (body.success) {
      alert(body.message);
      return;
    }
    this.props.dispatch({
      type: "login-success"
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleLoginSubmit}>
        <div>
          Email
          <input type="text" onChange={this.handleLoginUsername} />
        </div>
        <div>
          Password
          <input type="text" onChange={this.handleLoginPassword} />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    );
  };
}

let Login = connect()(UnconnectedLogin);
export default Login;
