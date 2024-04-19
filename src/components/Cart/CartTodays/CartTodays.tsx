import React, { useEffect, useState } from "react";
import classes from "./cartTodays.module.scss";
import axios from "axios";

import { OneCart, ProductEmpty, Loader } from "../../../helper/index";
import { apiUrl } from "../../../helper/env";
import { useAppDisptach } from "../../../redux/store/hook";

interface Product {
  productId: {
    _id: string;
    name: string;
    img: string;
    rating: number;
    price: number;
    price_previous: number;
  };
}

const CartTodays: React.FC = () => {
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getDealsProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/dealsproducts`);
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
