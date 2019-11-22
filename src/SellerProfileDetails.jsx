import React, { Component } from "react";
import { connect } from "react-redux";
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

  render = () => {
    console.log("here");
    return (
      <div className="sellerProfileContainer">
        <form className="sellerProfile-form">
          <h3>Personal Details</h3>
          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>First Name</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleFirstName}
              />
            </div>
            <div className="sellerProfile-name">
              <h6>Last Name</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleLastName}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>Address 1</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleAddress1}
              />
            </div>

            <div className="sellerProfile-name">
              <h6>Address 2</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleAddress2}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name" style={{ width: "70%" }}>
              <h6>Phone Number</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handlePhoneNumber}
              />
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name">
              <h6>Country</h6>
              <select
                className="sellerProfile-inputbox"
                onChange={this.props.handleCountry}
                value={this.props.Country}
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada</option>
                <option value="United States">United States</option>
              </select>
            </div>
            <div className="sellerProfile-name">
              <h6>State/Province</h6>
              <select
                className="sellerProfile-inputbox"
                onChange={this.handleState}
              >
                <option value="">--- Select State ---</option>
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
                <option value="">--- Select Province ---</option>
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
            </div>
          </div>

          <div className="sellerProfile-row">
            <div className="sellerProfile-name" style={{ width: "30%" }}>
              <h6>Zip</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleZip}
              />
            </div>
            <div className="sellerProfile-name" style={{ width: "50%" }}>
              <h6>City</h6>
              <input
                className="sellerProfile-inputbox"
                type="text"
                onChange={this.props.handleZip}
              />
            </div>
          </div>
          <button
            className="sellerProfile-button"
            onClick={this.props.handleSubmitPersonalDetails}
          >
            Next
          </button>
        </form>
      </div>
    );
  };
}

let SellerProfileDetails = connect()(UnconnectedSellerProfileDetails);
export default SellerProfileDetails;
