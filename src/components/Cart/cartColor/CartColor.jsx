import React from "react";
import classes from "./cartColor.module.scss";
import { Link } from "react-router-dom";

const CartColor = ({ productId, img }) => {
  return (
    <div>
      <Link to={`/products/${productId}`}>
        <div className={classes.cartColor}>
          <img src={img} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default CartColor;
