import React from "react";
import classes from "./productDetail.module.scss";

import frame from "../../../../public/assets/images/Frame.png";

import { Cart, Price } from "../../../helper/index";

interface ProductInfo {
  price: number;
  price_previous: number;
  margin: string;
}

interface ProductDetailProps {
  selectedProduct: ProductInfo;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ selectedProduct }) => {
  return (
    <div className={classes.product_detail}>
      <div>
        <p>From</p>
        <Price {...selectedProduct} margin="right" />
      </div>
      <div className={classes.product_detail_info}>
        <div className={classes.detail_info}>
          <p>Or 6 weekly intrest-free payment from $5.83 with</p>

          <div className={classes.logo}>
            <img src={frame} alt="" />
          </div>
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
