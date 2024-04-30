import React, { useEffect, useRef, useState } from "react";
import classes from "./bannerProducts.module.scss";

import { Button, Price } from "../../../helper/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice/cartSlice";
import { apiUrl } from "../../../helper/env";

interface BannerProduct {
  productId: {
    _id: string;
    name: string;
    img: string;
    title: string;
    price: number;
    price_previous: number;
    bannerPicture: string;
  };
}

const BannerProducts: React.FC = () => {
  const [bannerProduct, setBannerProduct] = useState<BannerProduct[]>([]);

  const dispatch = useDispatch();

  const handleAddToCart = (bannerProduct: BannerProduct) => {
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

  const getBanner = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/bannerproduct`);

      setBannerProduct(data);
    } catch (error) {
      console.log("Error fetching deals bannerProduct:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

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
