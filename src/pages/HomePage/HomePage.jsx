import React, { Component } from "react";
import Header from "../../components/Home/Header/Header";
import { SearchBar } from "../../components";
import Banner from "../../components/Home/Banner/Banner";
import styles from "./HomePage.module.css";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header
          title={"Find, invite and compete"}
          description={
            "Invite your friends and compete against them in the areas you specify"
          }
        />
        <SearchBar />
        <hr className={styles.line} />
        <Banner showModal={this.showModal} />
      </div>
    );
  }
}

export default HomePage;
