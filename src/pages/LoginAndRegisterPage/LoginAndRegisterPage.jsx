import React, { Component } from "react";
import LoginModal from "react-login-modal";
import HttpService from "../../services/HttpService";
import styles from "./LoginAndRegisterPage.module.css";

class LoginAndRegisterPage extends Component {
  handleSignup = (username, email, password) => {
    HttpService.registerUser(username, email, password);
  };
  handleLogin = (username, password) => {
    HttpService.loginUser(username, password);
  };

  render() {
    return (
      <main className={styles.container}>
        <LoginModal
          handleSignup={this.handleSignup}
          handleLogin={this.handleLogin}
        />
      </main>
    );
  }
}

export default LoginAndRegisterPage;
