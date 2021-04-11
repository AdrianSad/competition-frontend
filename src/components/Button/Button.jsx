import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

const Button = ({ onClick, text, className, outline, ...props }) => (
  <button
    onClick={onClick}
    className={classNames(styles.button, className, {
      [styles.outline]: outline,
    })}
    {...props}
    type={"button"}
  >
    {text}
  </button>
);

export default Button;
