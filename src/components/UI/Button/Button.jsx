import React from "react";
import classes from "./button.module.scss";

export const ButtonBig = ({ children }) => {
  return (
    <>
      <button className={classes.buttonBig}>{children}</button>
    </>
  );
};

export const ButtonSmall = ({ children }) => {
  return (
    <>
      <button className={classes.buttonSmall}>{children}</button>
    </>
  );
};
