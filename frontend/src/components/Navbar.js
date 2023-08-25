import React, { Component } from "react";
import { Link } from "react-router-dom";
import Styles from "../styles/Navbar.module.css";
import Logo from "../assets/images/logo.png"
import { FaShoppingBasket } from "react-icons/fa";

class Navbar extends Component {
  render() {
    return (
      <div className={Styles.header}>
      <div className={Styles.container}>
        <div>
          <img className={Styles.logo} src={Logo} alt="Logo" />
        </div>
        <ul className={Styles.topmenu}>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/produk">Produk</Link>
          </li>
          <li>
            <Link to="/kontak">Kontak</Link>
          </li>
          <li>
            <Link to="/tentang">Tentang</Link>
          </li>
        </ul>
        <div className={Styles.cart}>
        <Link to="/keranjang"><FaShoppingBasket /></Link>
          
        </div>
      </div>
      </div>
        
    );
  }
}

export default Navbar;
