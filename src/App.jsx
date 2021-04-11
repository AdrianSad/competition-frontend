import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HOME, LOGIN } from "./const/routes";
import { HomePage, LoginAndRegisterPage } from "./pages";
import WithLayout from "./hoc/Layout/WithLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME} component={WithLayout(HomePage)} />
        <Route
          exact
          path={LOGIN}
          component={WithLayout(LoginAndRegisterPage)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
