import React from "react";
import classes from "./productEmpty.module.scss";

import notFound from "../../../../public/assets/images/no-product.png";

const ProductEmpty = () => {
  return (
    <div className={classes.deals_container}>
      <div className={classes.deals_img}>
        <img src={notFound} className={classes.deals} alt="" />
      </div>
    </div>
  );
};

export default ProductEmpty;
