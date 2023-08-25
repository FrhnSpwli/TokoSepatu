import React, { Component } from "react";
import Styles from "../styles/Checkout.module.css";
import { AiFillBank } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config.js";

class Checkout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      alamat: "",
      phone: "",
    };

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(data) {
    const session_id = localStorage.getItem("cartId");
    axios.post(config.ROOT_URL + 'frontend/checkout?session_id=' + session_id, this.state)
    .then(result => {
      console.log(result)
      if(result.data.code === 200) {
        window.location.href = "/transaksi/" + result.data.data.trs_number;
      }
    }).catch(err => {
      alert(err.message)
    })
  }

  handleNamaDepan = (e) => {
    this.setState({ first_name: e.target.value });
    // console.log("DATA >> ", )
  };

  handleNamaBelakang = (e) => {
    this.setState({ last_name: e.target.value });
    // console.log("DATA >> ", this.state)
  };

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
    // console.log("DATA >> ", this.state)
  };

  handleAlamat = (e) => {
    this.setState({ alamat: e.target.value });
    // console.log("DATA >> ", this.state)
  };

  handlePhone = (e) => {
    this.setState({ phone: e.target.value });
    // console.log("DATA >> ", this.state)
  };

  componentDidMount() {
    const session_id = localStorage.getItem("cartId");
    axios.get(config.ROOT_URL + 'frontend/checkout?session_id=' + session_id)
      .then((result) => {
        if(result.data.code === 200) {
          this.setState({
            first_name: result.data.data.first_name,
            last_name: result.data.data.last_name,
            email: result.data.data.email,
            alamat: result.data.data.alamat,
            phone: result.data.data.phone,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <React.Fragment>
        <div className={Styles.row}>
          <h2 className={Styles.color_primary}>
            Isi Form untuk Metode Pembayaran
          </h2>
          <div className={Styles.container}>
            <form onSubmit={() => this.submitForm()}>
              <div className={Styles.form_2_grid}>
                <div className={Styles.grid_form_2}>
                  <input type="text" placeholder="Nama Depan" onKeyUp={this.handleNamaDepan}/>
                  <input type="text" placeholder="Email" onKeyUp={this.handleEmail} />
                  <div className={Styles.payment_method}>
                    <h4 className={Styles.color_primary}>Metode Pembayaran</h4>
                    <div>
                      <AiFillBank />
                      <span>Bank Transfer</span>
                    </div>
                    <p>Bank BCA an. Andi Farhan Sappewali No.1192900026</p>
                  </div>
                </div>
                <div className={Styles.grid_form_2}>
                  <input type="text" placeholder="Nama Belakang" onKeyUp={this.handleNamaBelakang} />
                  <textarea placeholder="Alamat Lengkap" onKeyUp={this.handleAlamat}></textarea>
                  <input type="text" placeholder="Phone Number" onKeyUp={this.handlePhone} />
                </div>
              </div>
              <button type="submit" className={Styles.proses_bayar}>Proses Pembayaran</button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Checkout;
