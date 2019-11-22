import React, { Component } from "react";
import SellerProfileDetails from "./SellerProfileDetails.jsx";
import SellerPaymentDetails from "./SellerPaymentDetails.jsx";
import SubmitSellerDetails from "./submitSellerDetails.jsx";

export class SellerProfile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      country: "",
      zip: "",
      state: "",
      province: "",
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      file: "",
      preview: "",
      terms: false,
      profileDetails: true,
      paymentDetails: false,
      submitDetails: false
    };
    this.handleProfileImageFile = this.handleProfileImageFile.bind(this);
  }

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
  handleSubmitPersonalDetails = () => {
    console.log("handleSubmitPersonalDetails");
    this.setState({ profileDetails: false, paymentDetails: true });
  };
  handleBankName = event => {
    console.log("handleBankName", event.target.value);
    this.setState({ bankName: event.target.value });
  };
  handleRoutingNumber = event => {
    console.log("handleBankName", event.target.value);
    this.setState({ routingNumber: event.target.value });
  };
  handleAccountNumber = event => {
    console.log("handleAccountNumber", event.target.value);
    this.setState({ accountNumber: event.target.value });
  };
  handleSubmitPaymentDetails = event => {
    event.preventDefault();
    console.log("handleSubmitPaymentDetails", event.target.value);
    this.setState({ paymentDetails: false, submitDetails: true });
  };
  handleProfileImageFile = event => {
    event.preventDefault();
    console.log(event.target.files);
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
  };
  handleTermsAndConditions = event => {
    event.preventDefault();
    this.setState({ terms: true });
    console.log(this.state.terms);
  };
  handleSubmitSellerProfile = async () => {
    event.preventDefault();
    console.log("handleSubmitPaymentDetails");
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
    data.append("bankName", this.state.bankName);
    data.append("routingNumber", this.state.routingNumber);
    data.append("accountNumber", this.state.accountNumber);
    data.append("file", this.state.file);
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
      type: "submitSellerDetails-success"
    });
  };

  render = () => {
    console.log(this.state.profileDetails);
    return (
      <React.Fragment>
        {this.state.profileDetails ? (
          <SellerProfileDetails
            handleFirstName={this.handleFirstName}
            handleLastName={this.handleLastName}
            handlePhoneNumber={this.handlePhoneNumber}
            handleAddress1={this.handleAddress1}
            handleAddress2={this.handleAddress2}
            handleState={this.handleState}
            handleProvince={this.handleProvince}
            handleZip={this.handleZip}
            handleCountry={this.handleCountry}
            handleSubmitPersonalDetails={this.handleSubmitPersonalDetails}
          />
        ) : (
          <div></div>
        )}
        {this.state.paymentDetails ? (
          <SellerPaymentDetails
            handleBankName={this.handleBankName}
            handleRoutingNumber={this.handleRoutingNumber}
            handleAccountNumber={this.handleAccountNumber}
            handleSubmitPaymentDetails={this.handleSubmitPaymentDetails}
          />
        ) : (
          <div></div>
        )}
        {this.state.submitDetails ? (
          <SubmitSellerDetails
            handleProfileImageFile={this.handleProfileImageFile}
            handleTermsAndConditions={this.handleTermsAndConditions}
            handleSubmitSellerProfile={this.handleSubmitSellerProfile}
          />
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  };
}

export default SellerProfile;
