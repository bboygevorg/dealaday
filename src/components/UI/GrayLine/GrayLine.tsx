import React from "react";
import classes from "./grayLine.module.scss";

const GrayLine = ({ value }) => {
  return (
    <div className={classes.progress_container}>
      <div className={classes.gray_line}></div>
      <div className={classes.black_line} style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default GrayLine;
