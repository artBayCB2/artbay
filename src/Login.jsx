import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleLoginUsername = event => {
    console.log("handleLoginUsername", event.target.value);
    this.setState({ username: event.target.value });
  };
  handleLoginPassword = event => {
    console.log("handleLoginPassword", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleLoginSubmit = async event => {
    event.preventDefault();
    console.log("handleLoginSubmit", event.target.value);
    let body = { success: true };
    if (!body.success) {
      alert("Unsuccessful Login");
      return;
    }
    if (body.success) {
      alert("Successful Login");
      return;
    }
    this.props.dispatch({
      type: "login-successful"
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleLoginSubmit}>
        <div>
          Username
          <input type="text" onChange={this.handleLoginUsername} />
        </div>
        <div>
          Login
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
