import React from "react";
import classes from "./banner.module.scss";
import { GetBanner } from "../../redux/allRequests/types";

const Banner: React.FC<{ banner: GetBanner[] }> = ({ banner }) => {
  return (
    banner.length > 0 && (
      <>
        <div className={classes.banner_product} key={banner[0]._id}>
          <img
            className={classes.background_image}
            src={banner[0].backGroundImage}
            alt=""
          />

          <div className={classes.banner_info}>
            <h1 className={classes.banner_name}>{banner[0].name}</h1>
            <p className={classes.banner_description}>
              {banner[0].description}
            </p>
          </div>
        </div>
        <div className={classes.banner_product_descriptionShow}>
          <p>{banner[0].description}</p>
        </div>
      </>
    )
  );
};

export default Banner;
