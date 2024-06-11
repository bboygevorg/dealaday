import React, { useEffect } from "react";
import classes from "./cartTodays.module.scss";

import { ProductEmpty, Loader } from "../../../helper/index";
import { useAppSelector, useAppDisptach } from "../../../redux/store/hook";
import { fetchDealsProduct } from "../../../redux/allRequests/allRequests";
import OneCart from "./OneCart";

const CartTodays: React.FC = () => {
  const { dealsProducts, loading } = useAppSelector(
    (state) => state.allRequests
  );

  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(fetchDealsProduct());
  }, [dispatch]);

  return (
    <>
      <div className={classes.todays}>
        <div className={classes.container}>
          <h2>Today's Deals</h2>
          <div className={classes.cartTodays_cart}>
            {loading === "pending" ? (
              <Loader width="100%" />
            ) : dealsProducts && dealsProducts.length > 0 ? (
              dealsProducts.map((product, index) => {
                const { _id, name, img, rating, price, price_previous } =
                  product.productId;
                return (
                  <OneCart
                    key={index}
                    id={_id}
                    name={name}
                    img={img}
                    rating={rating}
                    price={price}
                    price_previous={price_previous}
                  />
                );
              })
            ) : (
              <ProductEmpty />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTodays;
