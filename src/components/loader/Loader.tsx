import React from "react";
import classes from "./loader.module.scss";

interface LoaderStyle {
  width: string;
}

const Loader: React.FC<LoaderStyle> = ({ width }) => {
  return (
    <div className={classes.loader_container} style={{ width: width }}>
      <p className={classes.loader}>Load&nbsp;ng</p>
    </div>
  );
};

export default Loader;
