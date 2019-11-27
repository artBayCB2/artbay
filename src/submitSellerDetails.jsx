import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SellerProfile.css";
import FormFlowTab from "./Components/FormFlowTab/FormFlowTab.jsx";

class UnconnectedSubmitSellerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      preview: "",
      terms: false
    };
    this.handleFile = this.handleFile.bind(this);
  }
  handleFile = event => {
    event.preventDefault();
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
    this.props.handleProfileImageFile(event);
  };
  render = () => {
    return (
      <React.Fragment>
        <div className="sellerProfileContainer">
          <FormFlowTab tabNumber={this.props.tabNumber} />
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
                onChange={this.handleFile}
              />
              <div className="sellerProfile-button-row">
                {this.state.file ? (
                  <img
                    className="sellerProfile-uploadPreview"
                    src={this.state.preview}
                  />
                ) : (
                  <img
                    className="sellerProfile-uploadPreview"
                    src="../assets/NoUserProfileImage.png"
                  />
                )}
              </div>
            </div>
            <div className="sellerProfile-row" style={{ padding: "10px" }}>
              <input
                style={{ marginRight: "5px" }}
                type="checkbox"
                defaultChecked={this.state.terms}
                onChange={this.props.handleTermsAndConditions}
              />
              <h6>I agree to the terms and conditions of ArtBay</h6>
            </div>
            <div className="sellerProfile-button-row">
              <button
                className="sellerProfile-button-back"
                onClick={this.props.previous}
              >
                Back
              </button>

              <button
                style={{ width: "100%" }}
                className="sellerProfile-button"
                type="submit"
              >
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
