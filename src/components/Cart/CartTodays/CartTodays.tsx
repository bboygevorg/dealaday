import React, { useEffect, useState } from "react";
import classes from "./cartTodays.module.scss";
import axios from "axios";

import { OneCart, ProductEmpty, Loader } from "../../../helper/index";

const CartTodays = () => {
  const [dealsProducts, setDealsProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getDealsProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/product/dealsproducts"
      );
      setDealsProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching deals products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDealsProducts();
  }, []);

  return (
    <>
      <div className={classes.todays}>
        <div className={classes.container}>
          <h2>Today's Deals</h2>
          <div className={classes.cartTodays_cart}>
            {loading ? (
              <Loader width="100%" />
            ) : dealsProducts && dealsProducts.length > 0 ? (
              dealsProducts.map((product, index) => {
                const { productId, name, img, rating, price, price_previous } =
                  product;
                return (
                  <OneCart
                    key={index}
                    id={productId}
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
