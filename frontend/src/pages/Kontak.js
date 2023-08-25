import React, { Component } from "react";
import Styles from "../styles/Kontak.module.css";
import { Link } from "react-router-dom";

class Kontak extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={Styles.container}>
          <div className={Styles.grid_form_1}>
            <div className={Styles.card}>
              <h4>Kontak Kami</h4>
              <p>Email : admin@gmail.com</p>
              <p>Telp : (021) 123 1234</p>
              <p>
                Alamat Kami : Jl. Raya Malino, Maros, Sulawesi Barat, Indonesia,
                90234
              </p>
            </div>
          </div>
          <div className={Styles.grid_form_2}>
            <form>
              <input type="text" placeholder="Nama Lengkap" />
              <input type="text" placeholder="Email" />
              <textarea placeholder="Tulis pesan anda di sini"></textarea>
            </form>
            <Link to="/transaksi" className={Styles.send}>
              Kirim
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Kontak;
