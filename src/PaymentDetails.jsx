import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BankName: "",
      RoutingNumber: "",
      AccountNumber: ""
    };
  }
  handleBankName = event => {
    console.log("handleBankName", event.target.value);
    this.setState({ BankName: event.target.value });
  };
  handleRoutingNumber = event => {
    console.log("handleBankName", event.target.value);
    this.setState({ RoutingNumber: event.target.value });
  };
  handleAccountNumber = event => {
    console.log("handleAccountNumber", event.target.value);
    this.setState({ AccountNumber: event.target.value });
  };
  handleSubmitPaymentDetails = event => {
    event.preventDefault();
    console.log("handleSubmitPaymentDetails");
    if (!body.success) {
      alert("Unsuccessful Payment Details Entry");
      return;
    }
    if (body.success) {
      alert("Successful Payment Details Entry");
      return;
    }
    this.props.dispatch({
      type: "paymentDetails-success"
    });
  };
  render = () => {
    return (
      <React.Fragment>
        <div className="containerSellerProfile">
          <form className="childContainerSellerProfile">
            <h3 className="h3SellerProfile">Payment Details</h3>
            <div>
              <h6 className="h6SellerProfile">Bank Name</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleBankName}
              />
            </div>
            <div>
              <h6 className="h6SellerProfile">Routing Number</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleRoutingNumber}
              />
              <h6 className="h6SellerProfile">Account Number</h6>
              <input
                className="inputSellerProfile"
                type="text"
                onChange={this.handleAccountNumber}
              />
            </div>
            <div>
              <button className="buttonSellerProfile">
                <Link className="linkNext" to={"/submitsellerdetails/"}>
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

let PersonalDetails = connect()(UnconnectedPaymentDetails);
export default PersonalDetails;
