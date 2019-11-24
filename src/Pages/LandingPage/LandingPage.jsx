import React, { Component } from "react";
import NavBar from "../../NavBar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import HeroImage from "../../HeroImage.jsx";
import ItemList from "../../ItemsList.jsx";
import LandingPageFilter from "../../LandingPageFilter.jsx";

export class LandingPage extends Component {
  render() {
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

export default LandingPage;
