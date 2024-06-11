import React from "react";
import classes from "./productDetail.module.scss";

import frame from "../../../public/assets/images/Frame.png";

import { Cart, Price } from "../../helper/index";

export interface Product {
  _id: string;
  name: string;
  icon_option: Icon;
  title: string;
  rating: number;
  brand: string;
  sku: number;
  img: string;
  description: string;
  price: number;
  price_previous: number;
}

export interface Icon {
  icon: string;
  info: string;
  title: string;
}

interface ProductDetailProps {
  selectedProduct: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ selectedProduct }) => {
  return (
    <div className={classes.product_detail}>
      <div className={classes.product_detail_price}>
        <p>From</p>
        <Price
          price={selectedProduct.price}
          price_previous={selectedProduct.price_previous}
          margin="right"
        />
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
