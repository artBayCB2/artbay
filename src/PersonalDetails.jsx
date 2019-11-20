import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedPersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Address1: "",
      Address2: "",
      Country: "",
      Zip: "",
      State: "",
      Province: ""
    };
  }
  renderStates = () => {
    return (
      <select className="inputSellerProfile" onChange={this.handleState}>
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
      <select className="inputSellerProfile" onChange={this.handleProvince}>
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
    this.setState({ FirstName: event.target.value });
  };
  handleLastName = event => {
    console.log("handleLastName", event.target.value);
    this.setState({ LastName: event.target.value });
  };
  handlePhoneNumber = event => {
    console.log("handlePhoneNumber", event.target.value);
    this.setState({ PhoneNumber: event.target.value });
  };
  handleAddress1 = event => {
    console.log("handleAddress1", event.target.value);
    this.setState({ Address1: event.target.value });
  };
  handleAddress2 = event => {
    console.log("handleAddress2", event.target.value);
    this.setState({ Address2: event.target.value });
  };
  handleState = event => {
    console.log("handleState", event.target.value);
    this.setState({ State: event.target.value });
  };
  handleProvince = event => {
    console.log("handleProvince", event.target.value);
    this.setState({ Province: event.target.value });
  };
  handleZip = event => {
    console.log("handleZip", event.target.value);
    this.setState({ Zip: event.target.value });
  };
  handleCountry = event => {
    console.log("handleCountry", event.target.value);
    this.setState({ Country: event.target.value });
  };
  handleSubmitPersonalDetails = async event => {
    event.preventDefault();
    console.log("handleSubmitPersonalDetails", event.target.value);
    let body = { success: true };
    if (!body.success) {
      alert("Unsuccessful Personal Details Entry");
      return;
    }
    if (body.success) {
      alert("Successful Personal Details Entry");
      return;
    }
    this.props.dispatch({
      type: "personDetails-success"
    });
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="containerSellerProfile">
          <form
            className="childContainerSellerProfile"
            onSubmit={this.handleSubmitPersonalDetails}
          >
            <div>
              <h6 className="h6SellerProfile">First Name</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleFirstName}
              />
              <h6 className="h6SellerProfile">Last Name</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleLastName}
              />
            </div>
            <div>
              <h6 className="h6SellerProfile">Phone Number</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handlePhoneNumber}
              />
            </div>
            <div>
              <h6 className="h6SellerProfile">Address 1</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleAddress1}
              />
            </div>
            <div>
              <h6 className="h6SellerProfile">Address 2</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleAddress2}
              />
            </div>
            <div>
              <h6 className="h6SellerProfile">Country</h6>
              <select
                className="inputSellerProfile"
                onChange={this.handleCountry}
                value={this.state.Country}
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <div>
              <h6 className="h6SellerProfile">State/Province</h6>
              {this.renderStateOrProvince()
                ? this.renderProvince()
                : this.renderStates()}
            </div>
            <div>
              <h6 className="h6SellerProfile">Zip Code / Postal Code</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleZip}
              />
            </div>
            <button className="buttonSellerProfile" type="submit">
              <Link to={"/paymentdetails/"}>Next</Link>
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  };
}

let PersonalDetails = connect()(UnconnectedPersonalDetails);
export default PersonalDetails;
