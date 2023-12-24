import React from "react";
import classes from "./banner.module.scss";
import { useSelector } from "react-redux";

import { Button } from "../../../helper/index";

const Banner = () => {
  const banner = useSelector((state) => state.products.bannerProduct);
  console.log(banner);

  return (
    banner &&
    banner.length > 0 && (
      <div className={classes.banner} key={banner[0].id}>
        <div className={classes.wrapper}>
          <div className={classes.bannerInfo}>
            <div className={classes.left_info}>
              <h1 className={classes.left_info_name}>{banner[0].name}</h1>
              <h3 className={classes.left_info_title}>{banner[0].title}</h3>
              <span className={classes.left_info_price}>
                ${banner[0].price}.00
              </span>
              <span className={classes.left_info_button}>
                <Button size="big" color="blue">
                  Add to cart
                </Button>
              </span>
            </div>
            <div className={classes.right_info}>
              <img src={banner[0].img_banner} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Banner;
