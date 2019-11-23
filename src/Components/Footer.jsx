import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer-MainRow">
          <div className="footer-NewsLetter">
            <h5>News Letter</h5>
            <div className="footer-centeredRow ">
              <input placeholder="Enter your email"></input>
              <button>Submit</button>
            </div>

            <div className="footer-FlexRow">
              <img height="12px" width="25px" src="../assets/VisaImage.png" />
              <img
                height="12px"
                width="25px"
                src="../assets/MasterCardImage.png"
              />
              <img
                height="12px"
                width="25px"
                src="../assets/MaestroImage.png"
              />
              <img height="12px" width="25px" src="../assets/CirrusImage.png" />
              <img
                height="12px"
                width="25px"
                src="../assets/AmericanExpressImage.png"
              />
            </div>
          </div>

          <div className="footer-TopItems">
            <h5>About us</h5>
            <div>
              <Link className="footer-MainRowLink" to="/our-story">
                Our Story
              </Link>
            </div>
            <div>
              <Link className="footer-MainRowLink" to="/contact-us">
                Contact Us
              </Link>
            </div>
            <div>
              <Link className="footer-MainRowLink" to="/career">
                Career
              </Link>
            </div>
          </div>

          <div className="footer-TopItems">
            <h5>Support</h5>
            <div>
              <Link className="footer-MainRowLink" to="/faqs">
                FAQs
              </Link>
            </div>
            <div>
              <Link className="footer-MainRowLink" to="/order-tracking">
                Order Tracking
              </Link>
            </div>
            <div>
              <Link className="footer-MainRowLink" to="/shipping-and-returns">
                Shipping and Returns
              </Link>
            </div>
            <div>
              <Link className="footer-MainRowLink" to="/policy">
                Policy
              </Link>
            </div>
          </div>

          <div className="footer-TopItems">
            <h5>Address</h5>
            <div>16122 Guy Street West </div>
            <div>Montreal QC, H8D 007 </div>
            <div>Quebec, Canada</div>
            <div>+1 514 837 6284</div>
            <div>hello@artbay.com</div>
          </div>
        </div>

        <div className="footer-bottomRow ">
          <img height="40px" width="40px" src="../assets/Logo1Light.png" />
          <div>© ArtBay 2019. All Rights Reserved</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
