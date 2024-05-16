import React, { useEffect, useRef, useState } from "react";
import classes from "./bannerProducts.module.scss";

import { Button, Price } from "../../../helper/index";
import { useAppSelector, useAppDisptach } from "../../../redux/store/hook";
import { addToCart } from "../../../redux/cartSlice/cartSlice";
import { fetchBannerProduct } from "../../../redux/allRequests/allRequests";
import { Product } from "../../../redux/allRequests/types";

const BannerProducts: React.FC = () => {
  const { bannerProduct } = useAppSelector((state) => state.allRequests);

  const dispatch = useAppDisptach();

  const handleAddToCart = (bannerProduct: Product) => {
    if (bannerProduct) {
      const { _id, name, price, img } = bannerProduct.productId;
      const productToAdd = { _id: _id, name, price, img };
      const selectedOption = 1;
      const subtotal = price * selectedOption;

      dispatch(
        addToCart({
          productToAdd,
          selectedOption,
          subtotal,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchBannerProduct());
  }, [dispatch]);

  return (
    bannerProduct.length > 0 && (
      <div className={classes.banner}>
        <div className={classes.wrapper}>
          <div className={classes.bannerInfo}>
            <div className={classes.left_info}>
              <h1 className={classes.left_info_name}>
                {bannerProduct[0].productId.name}
              </h1>
              <span className={classes.left_info_price}>
                <Price
                  price={bannerProduct[0].productId.price}
                  price_previous={bannerProduct[0].productId.price_previous}
                  margin="right"
                />
              </span>
              <span className={classes.left_info_button}>
                <Button
                  color="#ffffff"
                  backgroundButton="#3598cc"
                  padding="0.5rem 0.8rem"
                  hover="blue"
                  buttonFunction={() =>
                    bannerProduct.map((product) => handleAddToCart(product))
                  }
                >
                  Add to cart
                </Button>
              </span>
            </div>
            <div className={classes.right_info}>
              <img src={bannerProduct[0].productId.img} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BannerProducts;
