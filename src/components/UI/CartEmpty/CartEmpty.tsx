import React from "react";
import classes from "./cartEmpty.module.scss";

import img_empty from "../../../assets/img/product_dont_found.jpg";

const CartEmpty = () => {
  return (
    <div className={classes.cart_empty}>
      <img src={img_empty} alt="" />
    </div>
  );
};

export default CartEmpty;
