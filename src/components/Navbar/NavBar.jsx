import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { HOME } from "../../const/routes";
import { LINKS } from "../../const/NavBarLinks";
import { avatarImg, SettingsIcon } from "../../static";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <Link to={HOME} className={styles.logo}>
        Competition
      </Link>
      <ul className={styles.list}>
        {LINKS.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <Link to={item.path} className={styles.navItem}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <span className={styles.rightContainer}>
        <SettingsIcon className={styles.icon} />
        <img
          src={avatarImg}
          alt="Navigate to profile page"
          className={styles.avatar}
        />
      </span>
    </nav>
  );
};

export default NavBar;
