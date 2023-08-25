import React, { Component } from "react";
import { FaCartPlus } from "react-icons/fa";
import Styles from "../styles/Produk_Detail.module.css";
import axios from "axios";
import config from "../config/config.js";
import formatRupiah from "../libs/FormatRupiah.js";

class Produk_Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produk_item: {},
      qty: 1,
    };

  this.handleMinus = this.handleMinus.bind(this);
  this.handlePlus = this.handlePlus.bind(this);
  this.addToCart = this.addToCart.bind(this);
  }

  

  componentDidMount() {
    const url = this.props.match.params.url;
    axios
      .get(config.ROOT_URL + "frontend/produkDetail/" + url)
      .then((result) => {
        const produk_item = {
          id: result.data.data.id,
          title: result.data.data.title,
          description: result.data.data.description,
          price: formatRupiah(result.data.data.price),
          full_description: result.data.data.full_description,
          image: result.data.data.image,
          kategori: result.data.data.kategori.name,
          url: result.data.data.url,
          createAt: result.data.data.createAt,
        };
        this.setState({ produk_item });
      });
  }

  handlePlus() {
    this.setState({
      qty: this.state.qty + 1,
    });
  }

  handleMinus() {
    if (this.state.qty > 1) {
      this.setState({
        qty: this.state.qty - 1,
      });
    } else {
      alert("Minimal 1 item");
    }
  }

  // addToCart() {
  //   console.log({
  //     produk_id: this.state.produk_item.id,
  //     qty: this.state.qty,
  //     session_id: localStorage.getItem("cartId"),
  //   })

  //   // const body = {
  //   //   produk_id: this.state.produk_item.id,
  //   //   qty: this.state.qty,
  //   //   session_id: localStorage.getItem("cartId"),
  //   // }

  //   // axios.post(config.ROOT_URL + "frontend/keranjang", {
  //   //   produk_id: this.state.produk_item.id,
  //   //   qty: this.state.qty,
  //   //   session_id: localStorage.getItem("cartId"),
  //   // })
  //   // .then((result) => {
  //   //   console.log(result);
  //   // } 
  //   // ).catch((err) => {
  //   //   console.log(err);
  //   // })
  // }

  addToCart = event => {
    event.preventDefault();
    const body = {
      produk_id: this.state.produk_item.id,
      qty: this.state.qty,
      session_id: localStorage.getItem("cartId"),
    }

    axios.post(config.ROOT_URL + "frontend/keranjang", body)
    .then((result) => {
      console.log(result);
      alert("Produk berhasil ditambahkan ke keranjang");
    }
    ).catch((err) => {
      console.log(err);
      alert("Produk gagal ditambahkan ke keranjang");
    })
  }


  render() {
    return (
      <React.Fragment>
        <div className={Styles.row}>
          <div className={Styles.detail_produk}>
            <div className={Styles.item1}>
              <img
                src={config.ROOT_URL + "public/" + this.state.produk_item.image}
                alt="Gambar Produk"
              ></img>
            </div>
            <div className={Styles.item}>
              <h2>{this.state.produk_item.title}</h2>
              <h4>{this.state.produk_item.price}</h4>
              <hr />
              <p>Kategori: {this.state.produk_item.kategori}</p>
              <p>Deskripsi Singkat: {this.state.produk_item.description}</p>
              <hr />
              <div>
                <div className={Styles.input_group_2}>
                  <button onClick={() => this.handleMinus()}>-</button>
                  <input type="number" value={this.state.qty} />
                  <button onClick={() => this.handlePlus()}>+</button>
                </div>
              </div>
              <button onClick={this.addToCart} className={Styles.addcart}>
                <FaCartPlus />
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.row}>
          <div className={Styles.container_detail_produk}>
            <div className={Styles.deskripsi_produk}>
              <h2>Deskripsi Produk</h2>
              <hr />
              <p>
                {this.state.produk_item.full_description}. Contrary to popular
                belief, Lorem Ipsum is not simply random text. It has roots in a
                piece of classical Latin literature from 45 BC, making it over
                2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more
                obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from
                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                This book is a treatise on the theory of ethics, very popular
                during the Renaissance. The first line of Lorem Ipsum, "Lorem
                ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Produk_Detail;
