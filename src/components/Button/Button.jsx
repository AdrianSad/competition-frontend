import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

const Button = ({ onClick, text, className, ...props }) => (
  <button
    onClick={onClick}
    className={classNames(styles.button, className)}
    {...props}
    type={"button"}
  >
    {text}
  </button>
);

export default Button;
