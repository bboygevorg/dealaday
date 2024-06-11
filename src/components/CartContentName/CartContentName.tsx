import React from "react";
import classes from "./cartContentName.module.scss";

const CartContentName = () => {
  return (
    <>
      <p className={classes.text}>Product</p>
      <p className={classes.text}>Price</p>
      <p className={classes.text}>Quantity</p>
      <p className={classes.text}>Subtotal</p>
    </>
  );
};

export default CartContentName;
