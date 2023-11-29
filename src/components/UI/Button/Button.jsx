import React from "react";
import classes from "./button.module.scss";
import PropTypes from "prop-types";

const Button = ({ children, size, color, handleOfFilter }) => {
  const sizeClass =
    size === "big"
      ? classes.buttonBig
      : size === "small"
      ? classes.buttonSmall
      : size === "long"
      ? classes.buttonLong
      : "";

  const colorClass =
    color === "blue"
      ? classes.colorBlue
      : color === "gray"
      ? classes.colorGray
      : "";
  return (
    <>
      <button
        className={`${classes.button} ${sizeClass} ${colorClass}`}
        onClick={() => handleOfFilter()}
      >
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["big", "small", "long"]).isRequired,
  color: PropTypes.oneOf(["blue", "gray"]),
};

export default Button;
