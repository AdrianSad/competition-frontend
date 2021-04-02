import React, { Component } from "react";
import Header from "../../components/Home/Header/Header";
import { SearchBar } from "../../components";

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
      </div>
    );
  }
}

export default HomePage;
