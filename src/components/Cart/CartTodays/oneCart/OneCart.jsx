import React, { useState } from "react";
import classes from "./oneCart.module.scss";
import { getStarRaiting } from "../../../../helper/star";
import { WatchGood, WishList } from "../../../AddWishList/AddWishList";
import { ButtonBig } from "../../../UI/Button/Button";

const OneCart = ({ id, name, img, rating, price, price_discount }) => {
  const [active, setActive] = useState(false);

  const handleHover = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  return (
    <div
      className={classes.oneCart}
      key={id}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {active && (
        <div className={classes.addTo}>
          <div className={classes.addTo_top}>
            <WatchGood />
            <WishList />
          </div>
          <div className={classes.addTo_bottom}>
            <ButtonBig>Add To Cart</ButtonBig>
          </div>
        </div>
      )}
      <img src={img} alt={name} />
      <div className={classes.oneCart_info}>
        <h3 className={classes.oneCart_info_title}>{name}</h3>
        <div className={classes.boneCart_info_raiting}>
          {getStarRaiting(rating)}
          <span className={classes.review}>(160 Reviews)</span>
        </div>
        <div className={classes.oneCart_info_price}>
          <span
            className={
              price_discount <= 0 ? classes.price_center : classes.price
            }
          >
            ${price}.00
          </span>
          {price_discount > 0 ? (
            <span className={classes.price_discount}>${price_discount}.00</span>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
};

export default OneCart;
