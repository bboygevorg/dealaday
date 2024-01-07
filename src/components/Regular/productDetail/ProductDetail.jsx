import React from "react";
import classes from "./productDetail.module.scss";

import frame from "../../../../public/assets/images/Frame.png";

import { Cart, Price } from "../../../helper/index";

const ProductDetail = ({ selectedProduct }) => {
  return (
    <div className={classes.product_detail}>
      <div>
        <p>From</p>
        <Price {...selectedProduct} margin="right" />
      </div>
      <div className={classes.product_detail_info}>
        <div>
          <p>Or 6 weekly intrest-free payment from $5.83 with</p>
          <img src={frame} alt="" />
        </div>
        <div className={classes.product_detail_info_href}>
          <a href="#" onClick={() => alert("not working yet")}>
            What's this?
          </a>
        </div>
      </div>
      <div className={classes.product_detail_info_price}>
        <Cart />
      </div>
    </div>
  );
};

export default ProductDetail;
