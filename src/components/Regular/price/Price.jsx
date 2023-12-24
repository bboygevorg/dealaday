import React from "react";
import classes from "./price.module.scss";

const Price = ({ price, price_previous, margin }) => {
  const position =
    margin === "center"
      ? classes.price_center
      : margin === "right"
      ? classes.price
      : "";

  return (
    <div className={classes.oneCart_info_price}>
      <span className={price_previous <= 0 ? `${position}` : classes.price}>
        ${price}.00
      </span>
      {price_previous > 0 ? (
        <span className={classes.price_discount}>${price_previous}.00</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Price;
