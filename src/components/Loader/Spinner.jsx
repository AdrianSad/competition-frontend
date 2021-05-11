import React from "react";
import styles from "./Loader.module.css";
import classNames from "classnames";
import Loader from "react-loader-spinner";

const Spinner = ({ visible }) => {
  return (
    <div
      className={classNames(styles.hidden, {
        [styles.spinner]: visible,
      })}
    >
      <Loader type="Circles" color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Spinner;
