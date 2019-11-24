import React, { Component } from "react";
import { connect } from "react-redux";

import "./SellerProfile.css";
import FormFlowTab from "./Components/FormFlowTab/FormFlowTab.jsx";

class UnconnectedSellerPaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankName: "",
      routingNumber: "",
      accountNumber: ""
    };
  }
  render = () => {
    return (
      <React.Fragment>
        <div className="sellerProfileContainer">
          <FormFlowTab tabNumber={this.props.tabNumber} />
          <form className="sellerProfile-form">
            <h3>Payment Details</h3>
            <div className="sellerProfile-row">
              <div div className="sellerProfile-name">
                <h6>Bank Name</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.props.handleBankName}
                />
              </div>
            </div>
            <div className="sellerProfile-row">
              <div className="sellerProfile-name">
                <h6>Routing Number</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.props.handleRoutingNumber}
                />
              </div>
              <div className="sellerProfile-name">
                <h6>Account Number</h6>
                <input
                  className="sellerProfile-inputbox"
                  type="text"
                  onChange={this.props.handleAccountNumber}
                />
              </div>
            </div>
            <p>
              Note that payments are made within 48hours after delivery of the
              piece
            </p>
            <div className="sellerProfile-button-row">
              <button
                className="sellerProfile-button-back"
                onClick={this.props.previous}
              >
                Back
              </button>
              <button
                className="sellerProfile-button"
                onClick={this.props.handleSubmitPaymentDetails}
              >
                Next
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
