import React from "react";
import styles from "./Banner.module.css";
import { FriendshipImg } from "../../../static";
import { Link } from "react-router-dom";
import { LOGIN } from "../../../const/routes";

const Banner = () => {
  return (
    <div className={styles.container}>
      <img src={FriendshipImg} alt="" className={styles.img} />
      <div className={styles.containerRight}>
        <p className={styles.aboutText}>ABOUT US</p>
        <h3 className={styles.headerText}>
          Have fun and experience the adrenaline rush
        </h3>
        <p className={styles.descText}>
          Compete with your best friends and enjoy every second of it. First of
          all sign up and invite your friends to start your first competition
        </p>
        <Link to={LOGIN} className={styles.button}>
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Banner;
