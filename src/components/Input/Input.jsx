import React from "react";
import styles from "./Input.module.css";

const Input = ({ onChange, value, inputProps }) => {
  return (
    <div>
      <input
        className={styles.input}
        onChange={onChange}
        value={value}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
