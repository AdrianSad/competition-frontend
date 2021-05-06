import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HOME, LOGIN, NEW_COMPETITION } from "./const/routes";
import { HomePage, LoginAndRegisterPage, NewCompetitionPage } from "./pages";
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
        <Route
          exact
          path={NEW_COMPETITION}
          component={WithLayout(NewCompetitionPage)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
