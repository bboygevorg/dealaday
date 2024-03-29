import React, { useEffect, useState } from "react";
import classes from "./bannerProducts.module.scss";

import { Button, Price } from "../../../helper/index";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice/cartSlice";

interface BannerProduct {
  productId: string;
  name: string;
  title: string;
  price: number;
  price_previous: number;
  bannerPicture: string;
}

const BannerProducts: React.FC = () => {
  const [bannerProduct, setBannerProduct] = useState<BannerProduct[]>([]);

  const dispatch = useDispatch();

  console.log(bannerProduct);

  const handleAddToCart = (bannerProduct: BannerProduct) => {
    if (bannerProduct) {
      const { productId, name, price, bannerPicture } = bannerProduct;
      const productToAdd = { _id: productId, name, price, img: bannerPicture };
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
      const { data } = await axios("http://localhost:5000/bannerproduct");
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
                {bannerProduct[0].name}
              </h1>
              <h3 className={classes.left_info_title}>
                {bannerProduct[0].title}
              </h3>
              <span className={classes.left_info_price}>
                <Price
                  price={bannerProduct[0].price}
                  price_previous={bannerProduct[0].price_previous}
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
              <img src={bannerProduct[0].bannerPicture} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BannerProducts;
