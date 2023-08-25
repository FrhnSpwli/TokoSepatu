import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import RandomId from "./libs/RandomId.js"

if(!localStorage.getItem('cartId')) {
  localStorage.setItem('cartId', RandomId(32));
}

ReactDOM.render(
  <BrowserRouter>
      <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);