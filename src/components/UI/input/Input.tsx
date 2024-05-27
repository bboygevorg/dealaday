import React from "react";
import classes from "./input.module.scss";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input {...props} className={classes.input} />;
};

export default Input;
