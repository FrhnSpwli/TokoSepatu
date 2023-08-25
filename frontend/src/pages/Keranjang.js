import React, { Component } from "react";
import Styles from "../styles/Keranjang.module.css";
import { Link } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
import FormatRupiah from "../libs/FormatRupiah";

class Keranjang extends Component {

  constructor(props) {
    super(props);

    this.state = {
      produk: [],
    };

    this.delete_keranjang = this.delete_keranjang.bind(this);
  }

  componentDidMount() {
    const session_id = localStorage.getItem("cartId");
    axios
      .get(config.ROOT_URL + "frontend/keranjang?session_id=" + session_id)
      .then((result) => {
        const produk = result.data.data;
        this.setState({ produk });
      });
  }

  getCart = () => {
    const session_id = localStorage.getItem("cartId");
    axios
      .get(config.ROOT_URL + "frontend/keranjang?session_id=" + session_id)
      .then((result) => {
        const produk = result.data.data;
        this.setState({ produk });
      });
  };

  delete_keranjang = (id) => {
    axios
      .delete(config.ROOT_URL + "frontend/keranjang/" + id)
      .then((result) => {
        this.getCart();
        alert("Produk berhasil dihapus");
        window.location.reload();
      });
  };


  render() {
    let totalProduk = 0;
    return (
      <React.Fragment>
        <div className={Styles.row}>
          <div className={Styles.keranjang_container}>
            <table>
              <thead>
                <tr>
                  <th className={Styles.text_center}>#</th>
                  <th className={Styles.text_center}>Produk</th>
                  <th className={Styles.text_center}>@Harga</th>
                  <th className={Styles.text_center}>Qty</th>
                  <th className={Styles.text_center}>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {this.state.produk.map((item, index) => {
                  totalProduk += item.produk.price * item.qty;
                  return (
                    <tr key={item.id}>
                      <td>
                        <button onClick={() => this.delete_keranjang(item.id)} className={Styles.delete_keranjang}>X</button>
                      </td>
                      <td className={Styles.text_center}>
                        <div className={Styles.item_keranjang}>
                          <img src={config.ROOT_URL + 'public/' + item.produk.image} alt="Gambar" />
                          <h4>{item.produk.title}</h4>
                        </div>
                      </td>
                      <td className={Styles.text_right}>{item.produk.price}</td>
                      <td className={Styles.text_center}>{item.qty}</td>
                      <td className={Styles.text_right}>{item.produk.price * item.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={Styles.row}>
            <div className={Styles.total_keranjang}>
              <p>
                <span>Total = </span>
                <span className={Styles.text_right}>{FormatRupiah(totalProduk)}</span>
              </p>
              <Link to="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Keranjang;
