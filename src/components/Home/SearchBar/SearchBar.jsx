import React from "react";
import styles from "./SearchBar.module.css";
import { Button } from "../../index";

const SearchBar = ({ onSubmit }) => (
  <div className={styles.container}>
    <input
      type={"text"}
      id={"search"}
      placeholder={"Username"}
      className={styles.search}
    />
    <Button onClick={onSubmit} text={"Find Friend"} className={styles.button} />
    <p className={styles.hint}>
      By clicking &quot;Find Friend&quot; you will be able to find users by
      their usernames
    </p>
  </div>
);

export default SearchBar;
