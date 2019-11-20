import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedSubmitSellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmitPaymentDetails = event => {
    event.preventDefault();
    console.log("handleSubmitPaymentDetails");
    if (!body.success) {
      alert("Unsuccessful Submit Seller Details");
      return;
    }
    if (body.success) {
      alert("Successful Submit Seller Details");
      return;
    }
    this.props.dispatch({
      type: "submitSellerDetails-success"
    });
  };

  render = () => {
    return (
      <React.Fragment>
        <div className="containerSellerProfile">
          <form className="childContainerSellerProfile">
            <h3 className="h3SellerProfile">Profile Picture</h3>
            <div>
              <h6 className="h6SellerProfile">Upload</h6>
              <input className="inputSellerProfile" type="file" />
            </div>
            <div>
              <button className="buttonSellerProfile">Submit</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };
}

let submitSellerDetails = connect()(UnconnectedSubmitSellerDetails);
export default submitSellerDetails;
