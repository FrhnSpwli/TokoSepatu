import React, { Component } from "react";
import Styles from "../styles/Transaksi.module.css";
import { Link } from "react-router-dom";
import { FaCheckSquare } from "react-icons/fa";

class Transaksi extends Component {

  constructor(props) {
    super(props)

    this.state = {
      trs_number: ''
    };
  }

  componentDidMount() {
    const trsNumber = this.props.match.params.number;
    this.setState({ trs_number: trsNumber });
  }


  render() {
    return (
      <React.Fragment>
        <div className={Styles.row}>
          <div className={Styles.container}>
            <div className={Styles.trs_container}>
              <FaCheckSquare />
              <h2>Pembayaran Sukses</h2>
              <p>Dengan No Transaksi: {this.state.trs_number}</p>
              <Link to="/" className={Styles.btn_back}>Kembali ke Homepage</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Transaksi;
