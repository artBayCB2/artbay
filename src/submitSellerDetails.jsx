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
    this.handleProfileImageFile = this.props.handleProfileImageFile.bind(this);
  }
  render = () => {
    return (
      <React.Fragment>
        <div className="sellerProfileContainer">
          <form
            className="sellerProfile-form"
            onSubmit={this.props.handleSubmitSellerProfile}
          >
            <h3>Profile Picture</h3>
            <div>
              <h6>Upload</h6>
              <input
                className="sellerProfile-inputbox"
                type="file"
                onChange={this.props.handleProfileImageFile}
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
                onChange={this.props.handleTermsAndConditions}
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

let SubmitSellerDetails = connect()(UnconnectedSubmitSellerDetails);
export default SubmitSellerDetails;
