import React from "react";
import classes from "./productEmpty.module.scss";

import notFound from "../../../../public/assets/images/no-product-found.jpg";

const ProductEmpty = () => {
  return (
    <div className={classes.deals_container}>
      <img src={notFound} className={classes.deals} alt="" />
    </div>
  );
};

export default ProductEmpty;
