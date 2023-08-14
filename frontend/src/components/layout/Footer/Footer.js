import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";
import TypewriterFooter from "./TypeWriter";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>Download Our APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playStore" />
        <img src={appStore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2023 &copy; Amit Kumar Thakur</p>
        <h3><TypewriterFooter /></h3>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/amit-thakur-ab7685128/">LinkedIn</a>
        <a href="https://twitter.com/amit_thakur7766">Twitter</a>
        <a href="https://github.com/102AMIT">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
