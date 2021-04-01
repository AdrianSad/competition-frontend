import React from "react";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <section>
      <NavBar />
      <section className={styles.container}>{children}</section>
      <Footer />
    </section>
  );
};

export default Layout;
