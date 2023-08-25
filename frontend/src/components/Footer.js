import React from "react";
import Styles from "../styles/Footer.module.css";
import Logo from "../assets/images/logo1.png";

const Footer = () => {
  return (
      <div className={Styles.footer}>
        <div>
          <img src={Logo} alt="logo"></img>
        </div>
        <p>© 2023. All Rights Reserved.</p>
      </div>
  );
};

export default Footer;