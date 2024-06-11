import React from "react";
import classes from "./cartColor.module.scss";
import { Link } from "react-router-dom";

interface CartType {
  productId: string;
  img: string;
}

const CartColor: React.FC<CartType> = ({ productId, img }) => {
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
