import React from "react";
import styles from "./Header.module.css";

const Header = ({ title, description }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.description}>{description}</p>
  </div>
);

export default Header;
