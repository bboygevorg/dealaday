import React, { useState } from "react";
import classes from "./oneCart.module.scss";
import { getStarRaiting } from "../../../../helper/star";
import { addToCart } from "../../../../redux/cartSlice/cartSlice";
import {
  Reviews,
  WatchGood,
  WishList,
  Price,
  Button,
} from "../../../../helper";
import { useDispatch } from "react-redux";

interface CartTodays {
  id: any;
  name: string;
  img: string;
  rating: number;
  price: number;
  price_previous: number;
}

const OneCart: React.FC<CartTodays> = ({
  id,
  name,
  img,
  rating,
  price,
  price_previous,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const productToAdd = { _id: id, name, price, img };
    const selectedOption = 1;
    const subtotal = price * selectedOption;

    dispatch(
      addToCart({
        productToAdd,
        selectedOption,
        subtotal,
      })
    );
  };

  const handleHover = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  const percentageView = (price: number, price_previous: number) => {
    const discount = price_previous - price;
    const percentage = (discount / price_previous) * 100;
    return parseInt(percentage.toString());
  };

  const discountPercentage =
    price_previous !== null ? percentageView(price, price_previous) : "";

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
            <Button
              padding="0.9rem 1.2rem"
              backgroundButton="#3598cc"
              color="#ffffff"
              buttonFunction={handleAddToCart}
              hover="blue"
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
      {discountPercentage ? (
        <p className={classes.oneCart_procent}>
          {`${discountPercentage}%`}{" "}
          <span style={{ color: "#ffffff" }}>off</span>
        </p>
      ) : (
        ""
      )}
      <div className={classes.oneCart_img}>
        <img src={img} alt={name} />
      </div>
      <div className={classes.oneCart_info}>
        <h3 className={classes.oneCart_info_title}>{name}</h3>
        <div className={classes.oneCart_info_raiting}>
          {getStarRaiting(rating)}
          <span className={classes.review}>
            <Reviews />
          </span>
        </div>
        <Price price={price} price_previous={price_previous} margin="center" />
      </div>
    </div>
  );
};

export default OneCart;
