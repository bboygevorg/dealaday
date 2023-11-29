import React from "react";
import classes from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.loader_container}>
      <p className={classes.loading_text}>Loading</p>
    </div>
  );
};

export default Loader;
