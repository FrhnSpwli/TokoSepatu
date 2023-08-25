import React, { Component } from "react";
import Styles from "../styles/Global.module.css";
import ProdukItem from "../components/Produk_Item.js";
import axios from "axios";
import config from "../config/config";
import history from "../libs/History";

class Produk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produk: [],
      keyword: "",
    };

    this.getInputAction = this.getInputAction.bind(this);
    this.getSearchAction = this.getSearchAction.bind(this);
  }

  getInputAction(event) {
    this.setState({ keyword: event.target.value });
  }

  getSearchAction() {
    history.push("?keyword=" + this.state.keyword);
    this.getProduk();
  }

  getProduk() {
    axios
      .get(
        config.ROOT_URL + "frontend/produkPage?keyword=" + this.state.keyword
      )
      .then((result) => {
        this.setState({ produk: result.data.data });
      });
  }

  componentDidMount() {
    this.getProduk();
  }

  render() {
    return (
      <React.Fragment>
        <div className={Styles.wrapper}>
          <div className={Styles.row}>
            <div className={Styles.card}>
              <div className={Styles.input_group_1}>
                <input
                  type="search"
                  placeholder="Cari Produk"
                  onKeyUp={this.getInputAction}
                />
                <button onClick={this.getSearchAction}>Cari</button>
              </div>
            </div>
          </div>
          <div className={Styles.row}>
            <div className={Styles.grid_produk}>
              {this.state.produk.map((item, index) => {
                return (
                  <ProdukItem
                    key={index}
                    image={config.ROOT_URL + "public/" + item.image}
                    title={item.title}
                    price={item.price}
                    action={item.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Produk;
