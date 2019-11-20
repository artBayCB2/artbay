import React, { Component } from "react";

class ArtUpload extends Component {
  constructor() {
    super();
    this.state = {
      filename: "",
      title: "",
      artistName: "",
      description: "",
      category: "",
      medium: "",
      size: "",
      originalPiece: "",
      quantity: "",
      price: ""
    };
  }
  handleFile = event => {
    event.preventDefault();
    this.setState({ file: event.target.files[0] });
  };
  handleTitle = event => {
    event.preventDefault();
    this.setState({ title: event.target.value });
  };
  handleArtistName = event => {
    event.preventDefault();
    this.setState({ artistName: event.target.value });
  };
  handleDescription = event => {
    event.preventDefault();
    this.setState({ description: event.target.value });
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
  handleSubmitArt = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("description", this.state.description);
    data.append("img", this.state.file);
    data.append("username", this.props.username);
    fetch("/art-data-upload", { method: "POST", body: data });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <form></form>
        </div>
      </React.Fragment>
    );
  }
}

export default ArtUpload;
