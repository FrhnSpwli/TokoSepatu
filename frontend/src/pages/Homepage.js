import React, { Component } from "react";
import Styles from "../styles/Global.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaShippingFast, FaFonticons } from "react-icons/fa";
import ProdukItem from "../components/Produk_Item.js";
import config from "../config/config.js";
import Produk_3 from "../assets/images/footer.png";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produk: [],
    };
  }

  componentDidMount() {
    axios
      .get(config.ROOT_URL + "frontend/produkHome")
      .then((result) => {
        const produk = result.data.data;
        this.setState({ produk });
      })
      .catch((error) => {});
  }

  render() {
    return (
      <React.Fragment>
        <div className={`${Styles.wrapper} ${Styles.banner_1}`}>
          <h1>
            Diskon Ramadhan Sale <br />
            50% OFF
          </h1>
        </div>
        <div className={Styles.wrapper}>
          <div className={Styles.row}>
            <div className={Styles.card}>
              <div className={Styles.input_group_1}>
                <input type="search" placeholder="Cari Produk" />
                <button>Cari</button>
              </div>
            </div>
          </div>
          <div className={Styles.row}>
            <div className={Styles.grid_produk}>
              {this.state.produk.map((produk) => (
                <ProdukItem
                  image={config.ROOT_URL + 'public/' + produk.image}
                  title={produk.title}
                  price={produk.price}
                  action={produk.url}
                />
              ))}
            </div>
          </div>
          <div className={`${Styles.row1} ${Styles.bg_primary}`}>
            <div className={Styles.grid_2}>
              <div className={Styles.grid_2_text}>
                <h1>
                  Adidas Men Running <br />
                  Sneakers
                </h1>
                <p>Barang LOKAL rasa IMPOR</p>
                <Link to="/">Lihat Produk</Link>
              </div>
              <div>
                <img src={Produk_3} alt="footerpic"></img>
              </div>
            </div>
          </div>
          <div className={Styles.row}>
            <div className={Styles.grid_3}>
              <div>
                <div>
                  <FaShippingFast />
                  <h4>FREE SHIPPING</h4>
                  <p>Mengantar hingga depan gang rumah anda.</p>
                </div>
              </div>
              <div>
                <div>
                  <FaFonticons />
                  <h4>100% REFUND</h4>
                  <p>
                    Menjamin uang anda kembali apabila barang tidak kami kirim.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <FaFonticons />
                  <h4>24/7 SUPPORT</h4>
                  <p>Senantiasa melayani keluhan anda selama telah membeli.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
