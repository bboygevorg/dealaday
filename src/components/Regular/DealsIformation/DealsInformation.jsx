import React from "react";
import classes from "./dealsInformation.module.scss";

import notFound from "../../../../public/assets/images/no-product-found.png";

const DealsInformation = () => {
  return (
    <div className={classes.deals_container}>
      <img src={notFound} className={classes.deals} alt="" />
    </div>
  );
};

export default DealsInformation;
