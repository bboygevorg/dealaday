import React from "react";
import classes from "./loader.module.scss";

const Loader = ({ width, margin, marginBottom }) => {
  const position = {
    width: width || "0",
    margin: margin || "0",
    marginBottom: marginBottom || "0",
  };

  return (
    <div className={classes.loader_container} style={position}>
      <p className={classes.loader}>Load&nbsp;ng</p>
    </div>
  );
};

export default Loader;
