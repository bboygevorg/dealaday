import React from "react";
import classes from "./bannerProduct.module.scss";

import bannerProduct from "../../../../assets/img/bannerProduct.png";

const BannerProduct = () => {
  return (
    <>
      <div className={classes.banner_product}>
        <img className={classes.background_image} src={bannerProduct} alt="" />
        
        <div className={classes.banner_info}>
          <h1 className={classes.banner_name}>Watches</h1>
          <p className={classes.banner_description}>
            Big screen. Huge impact. The challenge was to create a bigger
            display while barely expanding the dimensions of the watch itself.
            To do so, the display was completely re‑engineered reducing the
            borders by 40%, allowing for more screen area than both Series 6 and
            Series 3. Now that’s something to smile about.
          </p>
        </div>
      </div>
      <div className={classes.banner_product_descriptionShow}>
        <p>
          Big screen. Huge impact. The challenge was to create a bigger display
          while barely expanding the dimensions of the watch itself. To do so,
          the display was completely re‑engineered reducing the borders by 40%,
          allowing for more screen area than both Series 6 and Series 3. Now
          that’s something to smile about.
        </p>
      </div>
    </>
  );
};

export default BannerProduct;
