import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoods } from "../../../redux/initialGoods/initialGoods";
import classes from "./cartTodays.module.scss";
import OneCart from "./oneCart/OneCart";

const CartTodays = () => {
  const dispatch = useDispatch();
  const dealOfTheDayProducts = useSelector((state) => state.products.isDealOne);

  useEffect(() => {
    dispatch(getGoods());
  }, [dispatch]);

  return (
    <div className={classes.todays}>
      <div className={classes.container}>
        <div className={classes.cartTodays}>
          <h2>Today's Deals</h2>
          <div className={classes.cartTodays_cart}>
            {dealOfTheDayProducts?.map((product) => {
              const { id, name, img, rating, price, price_discount } = product;
              return (
                <OneCart
                  key={id}
                  id={id}
                  name={name}
                  img={img}
                  rating={rating}
                  price={price}
                  price_discount={price_discount}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTodays;
