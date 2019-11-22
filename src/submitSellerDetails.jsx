import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";

class UnconnectedSubmitSellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      preview: "",
      terms: false
    };
    this.handleProfileImageFile = this.handleProfileImageFile.bind(this);
  }
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
    return (
      <React.Fragment>
        <div className="sellerProfileContainer">
          <form
            className="sellerProfile-form"
            onSubmit={this.handleSubmitSellerProfile}
          >
            <h3>Profile Picture</h3>
            <div>
              <h6>Upload</h6>
              <input
                className="sellerProfile-inputbox"
                type="file"
                onChange={this.handleProfileImageFile}
              />
              {this.state.file ? (
                <img className="uploadPreview" src={this.state.preview} />
              ) : (
                <img className="uploadPreview" src="../assets/Logo1.png" />
              )}
            </div>
            <div className="sellerProfile-row" style={{ padding: "10px" }}>
              <h6>Terms and Conditions</h6>
              <input
                type="checkbox"
                defaultChecked={this.state.terms}
                onChange={this.handleTermsAndConditions}
              />
              <h6>I agree to the terms and conditions of ArtBay</h6>
            </div>
            <div>
              <button className="sellerProfile-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };
}

let submitSellerDetails = connect()(UnconnectedSubmitSellerDetails);
export default submitSellerDetails;
