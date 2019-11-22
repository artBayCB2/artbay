import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedSellerProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      country: "",
      zip: "",
      state: "",
      province: ""
    };
  }
  renderStates = () => {
    return (
      <select className="sellerProfile-inputbox" onChange={this.handleState}>
        <option value="">Select State/Province</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    );
  };
  renderProvince = () => {
    return (
      <select className="sellerProfile-inputbox" onChange={this.handleProvince}>
        <option value="">Select State/Province</option>
        <option value="AB">Alberta</option>
        <option value="BC">British Columbia</option>
        <option value="MB">Manitoba</option>
        <option value="NB">New Brunswick</option>
        <option value="NL">Newfoundland and Labrador</option>
        <option value="NS">Nova Scotia</option>
        <option value="ON">Ontario</option>
        <option value="PE">Prince Edward Island</option>
        <option value="QC">Quebec</option>
        <option value="SK">Saskatchewan</option>
        <option value="NT">Northwest Territories</option>
        <option value="NU">Nunavut</option>
        <option value="YT">Yukon</option>
      </select>
    );
  };

  renderStateOrProvince = () => {
    if (this.state.Country === "Select Country") {
      return this.setState((this.state.State = ""));
    }
    if (this.state.Country === "Canada") {
      return true;
    }
    return false;
  };

  handleFirstName = event => {
    console.log("handleFirstName", event.target.value);
    this.setState({ firstName: event.target.value });
  };
  handleLastName = event => {
    console.log("handleLastName", event.target.value);
    this.setState({ lastName: event.target.value });
  };
  handlePhoneNumber = event => {
    console.log("handlePhoneNumber", event.target.value);
    this.setState({ phoneNumber: event.target.value });
  };
  handleAddress1 = event => {
    console.log("handleAddress1", event.target.value);
    this.setState({ address1: event.target.value });
  };
  handleAddress2 = event => {
    console.log("handleAddress2", event.target.value);
    this.setState({ address2: event.target.value });
  };
  handleState = event => {
    console.log("handleState", event.target.value);
    this.setState({ state: event.target.value });
  };
  handleProvince = event => {
    console.log("handleProvince", event.target.value);
    this.setState({ province: event.target.value });
  };
  handleZip = event => {
    console.log("handleZip", event.target.value);
    this.setState({ zip: event.target.value });
  };
  handleCountry = event => {
    console.log("handleCountry", event.target.value);
    this.setState({ country: event.target.value });
  };
  handleSubmitPersonalDetails = async () => {
    console.log("handleSubmitPersonalDetails");
    event.preventDefault();
    let data = new FormData();
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("phoneNumber", this.state.phoneNumber);
    data.append("address1", this.state.address1);
    data.append("address2", this.state.address2);
    data.append("state", this.state.state);
    data.append("province", this.state.province);
    data.append("zip", this.state.zip);
    data.append("country", this.state.country);
    let response = await fetch("/seller-profile", {
      method: "POST",
      body: data
    });
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
      type: "personDetails-success"
    });
  };

  render = () => {
    console.log("here");
    return (
      <div className="sellerProfileContainer">
        <form
          className="sellerProfile-form"
          onSubmit={this.handleSubmitPersonalDetails}
        >
          <h3>Personal Details</h3>
          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>First Name</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleFirstName}
              />
            </div>
            <div className="sellerProfile-name">
              <h6>Last Name</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleLastName}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>Address 1</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleAddress1}
              />
            </div>

            <div className="sellerProfile-name">
              <h6>Address 2</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleAddress2}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name" style={{ width: "70%" }}>
              <h6>Phone Number</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handlePhoneNumber}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>Country</h6>
              <select
                className="sellerProfile-inputbox"
                onChange={this.handleCountry}
                value={this.state.Country}
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <div className="sellerProfile-name">
              <h6>State/Province</h6>
              {this.renderStateOrProvince()
                ? this.renderProvince()
                : this.renderStates()}
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name" style={{ width: "30%" }}>
              <h6>Zip</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleZip}
              />
            </div>
            <div className="sellerProfile-name" style={{ width: "50%" }}>
              <h6>City</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.handleZip}
              />
            </div>
          </div>
          <button className="sellerProfile-button" type="submit">
            <Link className="linkNext" to={"/seller-payment-details"}>
              Next
            </Link>
          </button>
        </form>
      </div>
    );
  };
}

let SellerProfileDetails = connect()(UnconnectedSellerProfileDetails);
export default SellerProfileDetails;
