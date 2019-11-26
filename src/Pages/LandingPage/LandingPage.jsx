import React, { Component } from "react";
import NavBar from "../../NavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import HeroImage from "../../HeroImage.jsx";
import ItemList from "../../ItemsList.jsx";
import LandingPageFilter from "../../LandingPageFilter.jsx";
import { connect } from "react-redux";

export class UnconnectedLandingPage extends Component {
  render() {
    this.props.dispatch({
      type: "set-nav-DashB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-SellB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-shopB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-uploadB",
      value: false
    });

    this.props.dispatch({
      type: "set-nav-searchB",
      value: true
    });

    this.props.dispatch({
      type: "set-nav-cartB",
      value: true
    });

    return (
      <React.Fragment>
        <NavBar />
        <HeroImage />
        <LandingPageFilter />
        <ItemList />
        <Footer />
      </React.Fragment>
    );
  }
}

let LandingPage = connect()(UnconnectedLandingPage);

export default LandingPage;
