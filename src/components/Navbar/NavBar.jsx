import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { HOME } from "../../const/routes";
import { LINKS } from "../../const/NavBarLinks";
import { avatarImg, SettingsIcon } from "../../static";
import HttpService from "../../services/HttpService";

const NavBar = () => {
  const [token, setToken] = useState(localStorage.getItem("user"));
  useEffect(() => setToken(localStorage.getItem("user")), [token]);
  const logout = () => {
    HttpService.logout();
    window.location.reload(true);
  };
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
      {token !== null ? (
        <span className={styles.rightContainer}>
          <SettingsIcon className={styles.icon} />
          <img
            src={avatarImg}
            alt="Navigate to profile page"
            className={styles.avatar}
          />
          <button type={"button"} onClick={logout} className={styles.button}>
            Logout
          </button>
        </span>
      ) : (
        <div />
      )}
    </nav>
  );
};

export default NavBar;
