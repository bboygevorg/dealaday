import React from "react";
import classes from "./Coupon.module.scss";

const Coupon = () => {
  return (
    <div className={classes.cart_coupon}>
      <input className={classes.coupon} type="text" placeholder="Coupon code" />
      <button
        className={classes.coupon_button}
        onClick={() => alert("not working yet")}
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default Coupon;
