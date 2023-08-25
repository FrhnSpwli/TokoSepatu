import React from "react";
import Styles from "../styles/Global.module.css";
import { Link } from "react-router-dom";
import FormatRupiah from "../libs/FormatRupiah";

const ProdukItem = (props) => {
  return (
    <div className={Styles.item_produk}>
      <img src={props.image} alt="Item Produk"></img>
      <p>{props.title} </p>
      <h4>{FormatRupiah(props.price)}</h4>
      <Link to = {'produk/' + props.action}>BELI</Link>
    </div>
  );
};

export default ProdukItem;