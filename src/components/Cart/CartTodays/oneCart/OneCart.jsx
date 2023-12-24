import React, { useState } from "react";
import classes from "./oneCart.module.scss";
import { getStarRaiting } from "../../../../helper/star";
import { WatchGood, WishList } from "../../../AddWishList/AddWishList";
import Button from "../../../UI/Button/Button";
import Price from "../../../Regular/price/Price";

const OneCart = ({ id, name, img, rating, price, price_previous }) => {
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
            <WatchGood productId={id} />
            <WishList />
          </div>
          <div className={classes.addTo_bottom}>
            <Button size="big" color="blue">
              Add to cart
            </Button>
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
        <Price price={price} price_previous={price_previous} margin="center" />
      </div>
    </div>
  );
};

export default OneCart;
