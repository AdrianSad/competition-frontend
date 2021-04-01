import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HOME } from "./const/routes";
import { HomePage } from "./pages";
import WithLayout from "./hoc/Layout/WithLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME} component={WithLayout(HomePage)} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
