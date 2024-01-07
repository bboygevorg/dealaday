import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoods } from "../../../redux/initialGoods/initialGoods";
import classes from "./cartTodays.module.scss";

import { Loader, OneCart, DealsInformation } from "../../../helper/index";

const CartTodays = () => {
  const dispatch = useDispatch();
  const dealOfTheDayProducts = useSelector((state) => state.products.isDealOne);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(getGoods());
  }, [dispatch]);

  return (
    <>
      <div className={classes.todays}>
        <div className={classes.container}>
          <div className={classes.cartTodays}>
            <h2>Today's Deals</h2>
            {loading ? (
              <Loader width="100%" marginBottom="4rem" />
            ) : (
              <div className={classes.cartTodays_cart}>
                {dealOfTheDayProducts && dealOfTheDayProducts.length > 0 ? (
                  dealOfTheDayProducts.map((product) => {
                    const { id, name, img, rating, price, price_previous } =
                      product;
                    return (
                      <OneCart
                        key={id}
                        id={id}
                        name={name}
                        img={img}
                        rating={rating}
                        price={price}
                        price_previous={price_previous}
                      />
                    );
                  })
                ) : (
                  <DealsInformation />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTodays;
