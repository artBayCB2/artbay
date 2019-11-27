import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ArtUpload.css";
import { withRouter } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";

class UnconnectedArtUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      preview: "",
      title: "",
      artist: "",
      description: "",
      category: "",
      style: "",
      subject: "",
      medium: "",
      material: "",
      size: "",
      originalPiece: false,
      quantity: 1,
      price: 0.0
    };
  }
  componentDidMount = () => {
    this._setArtUploadNavBar();
  };
  handleFile = event => {
    event.preventDefault();
    console.log(event.target.files);
    this.setState({
      preview: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });
  };
  handleTitle = event => {
    event.preventDefault();
    this.setState({ title: event.target.value });
  };
  handleArtistName = event => {
    event.preventDefault();
    this.setState({ artist: event.target.value });
  };
  handleDescription = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ description: event.target.value });
  };
  handleCategory = event => {
    event.preventDefault();
    this.setState({ category: event.target.value });
  };
  handleStyle = event => {
    event.preventDefault();
    this.setState({ style: event.target.value });
  };
  handleSubject = event => {
    event.preventDefault();
    this.setState({ subject: event.target.value });
  };
  handleCategory = event => {
    event.preventDefault();
    this.setState({ category: event.target.value });
  };
  handleMedium = event => {
    event.preventDefault();
    this.setState({ medium: event.target.value });
  };
  handleSize = event => {
    event.preventDefault();
    this.setState({ size: event.target.value });
  };
  handleOriginalPieceYes = event => {
    let _val = this.state.originalPiece;
    if (event.target.checked) {
      _val = true;
    }
    this.setState({ originalPiece: _val, quantity: 1 });
  };
  handleOriginalPieceNo = event => {
    let _val = this.state.originalPiece;
    if (event.target.checked) {
      _val = false;
    }
    this.setState({ originalPiece: _val });
  };
  handleQuantity = event => {
    event.preventDefault();
    this.setState({ quantity: event.target.value });
  };
  handlePrice = event => {
    event.preventDefault();
    this.setState({ price: event.target.value });
  };
  handleSubmitArt = async () => {
    console.log("handleSubmitArt");
    event.preventDefault();
    let data = new FormData();
    data.append("file", this.state.file);
    data.append("title", this.state.title);
    data.append("artist", this.state.artist);
    data.append("description", this.state.description);
    data.append("category", this.state.category);
    data.append("style", this.state.style);
    data.append("subject", this.state.subject);
    data.append("medium", this.state.medium);
    data.append("size", this.state.size);
    data.append("originalPiece", JSON.stringify(this.state.originalPiece));
    data.append("quantity", JSON.stringify(this.state.quantity));
    data.append("price", JSON.stringify(this.state.price));
    let response = await fetch("/art-data-upload", {
      method: "POST",
      body: data
      // file: this.state.file
    });
    await console.log("handleSubmitArt - after fetch");
    let responseBody = await response.text();
    console.log("responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("body.success", body.success);
    if (!body.success) {
      alert(body.message);
      return;
    }
    if (body.success) {
      // alert(body.message);
      this.props.history.push("/seller-dashboard");
      this.props.dispatch({
        type: "artupload-success"
      });
      return;
    }
  };

  _setArtUploadNavBar = () => {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="artupload-container">
          <h3>List your Art</h3>

          <form className="artupload-form" onSubmit={this.handleSubmitArt}>
            <div className="artupload-leftChildContainer">
              <h6>Title</h6>
              <input
                className="artupload-inputText"
                type="text"
                placeholder="title of the piece"
                onChange={this.handleTitle}
              />
              <h6>Artist</h6>
              <input
                className="artupload-inputText"
                type="text"
                placeholder="name of the artist that made the piece"
                onChange={this.handleArtistName}
              />
              <div className="artupload-row">
                <div>
                  <h6>Category</h6>

                  <select
                    className="artupload-inputText"
                    onChange={this.handleCategory}
                  >
                    <option value="">Select Category</option>
                    <option value="Drawings">Drawings</option>
                    <option value="Paintings">Paintings</option>
                    <option value="Photography">Photography</option>
                    <option value="Sculpture">Sculpture</option>
                  </select>
                </div>
                <div>
                  <h6>Style</h6>

                  <select
                    className="artupload-inputText"
                    onChange={this.handleStyle}
                  >
                    <option value="">Select Style</option>
                    <option value="Abstract">Abstract</option>
                    <option value="Conceptual">Conceptual</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Figurative">Figurative</option>
                    <option value="Fine Art">Fine Art</option>
                    <option value="Graffiti">Graffiti</option>
                    <option value="Modern">Modern</option>
                    <option value="Pop Art">Pop Art</option>
                    <option value="Portraiture">Portraiture</option>
                    <option value="Street Art">Street Art</option>
                    <option value="Surrealism">Surrealism</option>
                    <option value="Wall">Wall</option>
                  </select>
                </div>
              </div>
              <div className="artupload-row">
                <div>
                  <h6>Subject</h6>
                  <select
                    className="artupload-inputText"
                    onChange={this.handleSubject}
                  >
                    <option value="">Select Subject</option>
                    <option value="Animal">Animal</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Beach">Beach</option>
                    <option value="Body">Body</option>
                    <option value="Cartoon">Cartoon</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Love">Love</option>
                    <option value="Nature">Nature</option>
                    <option value="Nude">Nude</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Still Life">Still Life</option>
                  </select>
                </div>
                <div>
                  <h6>Medium</h6>
                  <select
                    className="artupload-inputText"
                    onChange={this.handleMedium}
                  >
                    <option value="">Select Medium</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Airbrush">Airbrush</option>
                    <option value="Black and White">Black and White</option>
                    <option value="Bronze">Bronze</option>
                    <option value="C-type">C-type</option>
                    <option value="Clay">Clay</option>
                    <option value="Color">Color</option>
                    <option value="Digital">Digital</option>
                    <option value="Glass">Glass</option>
                    <option value="Ink">Ink</option>
                    <option value="Metal">Metal</option>
                    <option value="Oil">Oil</option>
                    <option value="Pastel">Pastel</option>
                    <option value="Pencil">Pencil</option>
                    <option value="Watercolor">Watercolor</option>
                    <option value="Wood">Wood</option>
                  </select>
                </div>
              </div>
              <div className="artupload-row">
                <div>
                  <h6>Size</h6>
                  <select
                    className="artupload-inputText"
                    onChange={this.handleSize}
                  >
                    <option value="">Select Size</option>
                    <option value="S">Small - 4x6 to 5x7 inches</option>
                    <option value="M">Medium - 5x7 to 12x16 inches</option>
                    <option value="L">Large - 12x16 to 18x24 inches </option>
                    <option value="XL">X-Large - 18x24 to 36x48 inches</option>
                  </select>
                </div>
                <div>
                  <h6>Original Piece</h6>
                  <div className="artupload-checkbox-row">
                    <div>
                      <input
                        className="artupload-checkbox"
                        type="checkbox"
                        checked={this.state.originalPiece}
                        onChange={this.handleOriginalPieceYes}
                      />
                      <label>Yes</label>
                    </div>
                    <div>
                      <input
                        className="artupload-checkbox"
                        type="checkbox"
                        checked={!this.state.originalPiece}
                        onChange={this.handleOriginalPieceNo}
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="artupload-row">
                <div className="artupload-quantity">
                  <h6>Quantity</h6>
                  <input
                    className=" artupload-inputText "
                    type="number"
                    value={this.state.quantity}
                    disabled={this.state.originalPiece}
                    onChange={this.handleQuantity}
                  />
                </div>
                <div className="artupload-price">
                  <h6>Price</h6>
                  <input
                    className=" artupload-inputText "
                    type="number"
                    value={this.state.price}
                    onChange={this.handlePrice}
                  />
                </div>
              </div>
            </div>
            <div className="artupload-rightChildContainer">
              <h6>Upload Artwork</h6>
              <div className="artupload-upload">
                <input
                  className=" artupload-upload-button "
                  type="file"
                  onChange={this.handleFile}
                />
                <div className="artupload-preview">
                  {this.state.file ? (
                    <img className="uploadPreview" src={this.state.preview} />
                  ) : (
                    <img
                      className="uploadPreview"
                      src="../assets/Logo1Light.png"
                    />
                  )}
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <h6>Description</h6>
                <textarea
                  type="text"
                  className="artupload-description-inputText"
                  onChange={this.handleDescription}
                />
              </div>

              <button className="artupload-submitButton" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

let ArtUpload = connect()(UnconnectedArtUpload);
export default withRouter(ArtUpload);
