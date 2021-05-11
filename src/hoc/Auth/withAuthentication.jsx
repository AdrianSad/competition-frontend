import React from "react";
import { withRouter } from "react-router-dom";
import { LOGIN } from "../../const/routes";

const withAuthentication = (Component, redirect, props = null) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      if (localStorage.getItem("user") === null) {
        this.props.history.push(LOGIN);
      }
    }

    render() {
      return <Component {...this.props} {...props} />;
    }
  }

  return withRouter(WithAuthentication);
};
export default withAuthentication;
