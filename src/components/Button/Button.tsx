import React from "react";
import classes from "./button.module.scss";

interface Button {
  children: React.ReactNode;
  backgroundButton: string;
  padding: string;
  color: string;
  hover: string;
  buttonFunction: () => void;
}

const Button: React.FC<Button> = ({
  children,
  padding,
  backgroundButton,
  color,
  hover,
  buttonFunction,
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
        onClick={() => buttonFunction()}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
