import React, { useState } from "react";
import classes from "./button.module.scss";

// исправить button Hower

interface Button {
  children: React.ReactNode;
  backgroundButton: string;
  padding: string;
  color: string;
  hover: string;
  handleOfFilter: () => void;
}

const Button: React.FC<Button> = ({
  children,
  padding,
  backgroundButton,
  color,
  hover,
  handleOfFilter,
}) => {
  const hoverClass =
    hover == "blue"
      ? classes.hoverWhite
      : hover == "gray"
      ? classes.hoverGray
      : "";
  return (
    <>
      <button
        className={`${classes.button} ${hoverClass}`}
        style={{
          padding: padding,
          backgroundColor: backgroundButton,
          color: color,
        }}
        onClick={() => handleOfFilter()}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
