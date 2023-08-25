import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Homepage from "../pages/Homepage.js";
import CheckoutPage from "../pages/Checkout.js";
import KeranjangPage from "../pages/Keranjang.js";
import KontakPage from "../pages/Kontak.js";
import ProdukPage from "../pages/Produk.js";
import Produk_DetailPage from "../pages/Produk_Detail.js";
import TentangPage from "../pages/Tentang.js";
import TransaksiPage from "../pages/Transaksi.js";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

class Router extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/keranjang" exact component={KeranjangPage} />
          <Route path="/kontak" exact component={KontakPage} />
          <Route path="/produk" exact component={ProdukPage} />
          <Route path="/produk/:url" exact component={Produk_DetailPage} />
          <Route path="/tentang" exact component={TentangPage} />
          <Route path="/transaksi/:number" exact component={TransaksiPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Router;
