import React, { Component } from "react";
import "./HeroImage.css";

// let quotes = [
//   { quote: "Everything you can imagine is real.", by: "― Pablo Picasso" },
//   {
//     quote: "I dream my painting and I paint my dream.",
//     by: "― Vincent Willem van Gogh"
//   },
//   {
//     quote:
//       "Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.",
//     by: "― Leonardo da Vinci"
//   }
// ];

// let images = [
//   "/images/hero-images/photo-1551732998-9573f695fdbb",
//   "/images/hero-images/photo-1499781350541-7783f6c6a0c8",
//   "/images/hero-images/photo-1523554888454-84137e72c3ce"
// ];

export default class HeroImage extends Component {
  render() {
    return (
      <div class="hero-image">
        <div class="hero-text">
          <p>Shop original art from independent artists around the world</p>
        </div>
      </div>
    );
  }
}
