import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedSellerPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      routingNumber: "",
      accountNumber: ""
    };
  }
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
  handleSubmitPaymentDetails = async () => {
    event.preventDefault();
    console.log("handleSubmitPaymentDetails", event.target.value);
    let data = new FormData();
    let bankName = this.state.bankName;
    let routingNumber = this.state.routingNumber;
    let accountNumber = this.state.accountNumber;
    data.append("bankName", bankName);
    data.append("routingNumber", routingNumber);
    data.append("accountNumber", accountNumber);
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
      type: "paymentDetails-success"
    });
  };
  render = () => {
    return (
      <React.Fragment>
        <div className="sellerProfileContainer">
          <form className="sellerProfile-form">
            <h3>Payment Details</h3>
            <div className="sellerProfile-row">
              <div div className="sellerProfile-name">
                <h6>Bank Name</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.handleBankName}
                />
              </div>
            </div>
            <div className="sellerProfile-row">
              <div className="sellerProfile-name">
                <h6>Routing Number</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.handleRoutingNumber}
                />
              </div>
              <div className="sellerProfile-name">
                <h6>Account Number</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.handleAccountNumber}
                />
              </div>
            </div>
            <div>
              <button className="sellerProfile-button" type="submit">
                <Link className="linkNext" to={"/submit-seller-details"}>
                  Next
                </Link>
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };
}

let SellerPaymentDetails = connect()(UnconnectedSellerPaymentDetails);
export default SellerPaymentDetails;
