import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ArtUpload.css";

class UnconnectedArtUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      preview: "",
      name: "",
      artist: "",
      description: "",
      category: "",
      style: "",
      subject: "",
      medium: "",
      material: "",
      size: "",
      originalPiece: "",
      quantity: "",
      price: ""
    };
    this.handleFile = this.handleFile.bind(this);
  }
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
    this.setState({ name: event.target.value });
  };
  handleArtistName = event => {
    event.preventDefault();
    this.setState({ artist: event.target.value });
  };
  handleDescription = event => {
    event.preventDefault();
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
  handleOriginalPiece = event => {
    event.preventDefault();
    this.setState({ originalPiece: event.target.value });
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
    data.append("name", this.state.name);
    data.append("artist", this.state.artist);
    data.append("description", this.state.description);
    data.append("category", this.state.category);
    data.append("style", this.state.style);
    data.append("subject", this.state.subject);
    data.append("medium", this.state.medium);
    data.append("size", this.state.size);
    data.append("originalPiece", this.state.originalPiece);
    data.append("quantity", this.state.quantity);
    data.append("price", this.state.price);
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
      alert(body.message);
      return;
    }
    this.props.dispatch({
      type: "artupload-success"
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3>Add Art Details</h3>
        <form onSubmit={this.handleSubmitArt}>
          <div className="container">
            <div className="leftChildContainer">
              <h6>Title</h6>
              <input
                className="inputText"
                type="text"
                onChange={this.handleTitle}
              />
              <h6>Artist</h6>
              <input
                className="inputText"
                type="text"
                onChange={this.handleArtistName}
              />
              <h6>Category</h6>
              <select className="inputSelect" onChange={this.handleCategory}>
                <option value="">Select Category</option>
                <option value="Drawings">Drawings</option>
                <option value="Paintings">Paintings</option>
                <option value="Photography">Photography</option>
                <option value="Sculpture">Sculpture</option>
              </select>
              <h6>Style</h6>
              <select className="inputSelect" onChange={this.handleStyle}>
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
              <h6>Subject</h6>
              <select className="inputSelect" onChange={this.handleSubject}>
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
              <h6>Medium</h6>
              <select className="inputSelect" onChange={this.handleMedium}>
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
              <h6>Size</h6>
              <select className="inputSelect" onChange={this.handleSize}>
                <option value="">Select Size</option>
                <option value="S">Small - 4x6 to 5x7 inches</option>
                <option value="M">Medium - 5x7 to 12x16 inches</option>
                <option value="L">Large - 12x16 to 18x24 inches </option>
                <option value="XL">X-Large - 18x24 to 36x48 inches</option>
              </select>
              <h6>Original Piece</h6>
              <div className="originalPieceCheckBox">
                <div>
                  <input type="checkbox" onChange={this.handleOriginalPiece} />
                  <label>Yes</label>
                </div>
                <div>
                  <input type="checkbox" onChange={this.handleOriginalPiece} />
                  <label>No</label>
                </div>
              </div>
              <h6>Price</h6>
              <input
                className="inputText"
                type="text"
                onChange={this.handlePrice}
              />
            </div>
            <div className="rightChildContainer">
              <h6>Upload Artwork</h6>
              <input type="file" onChange={this.handleFile} />
              {this.state.file ? (
                <img className="uploadPreview" src={this.state.preview} />
              ) : (
                <img className="uploadPreview" src="../assets/Logo1.png" />
              )}
              <h6>Description</h6>
              <input
                type="text"
                className="inputTextDesc"
                onChange={this.handleDescription}
              />
              <button className="submitButton" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

let ArtUpload = connect()(UnconnectedArtUpload);
export default ArtUpload;
