import React, { Component } from "react";
import LoginModal from "react-login-modal";
import HttpService from "../../services/HttpService";
import styles from "./LoginAndRegisterPage.module.css";
import { HOME } from "../../const/routes";
import { withRouter } from "react-router";

class LoginAndRegisterPage extends Component {
  handleSignup = (username, email, password) => {
    HttpService.registerUser(username, email, password)
      .then(() => window.location.reload(true))
      .catch(console.error);
  };
  handleLogin = (username, password) => {
    HttpService.loginUser(username, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          HttpService.setTokenResult(response.data.token);
        }
      })
      .then(() => this.props.history.push(HOME))
      .catch(console.error);
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

export default withRouter(LoginAndRegisterPage);
