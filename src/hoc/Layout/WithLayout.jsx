import React from "react";
import Layout from "../../components/Layout/Layout";

export default (Component) => (props) => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
