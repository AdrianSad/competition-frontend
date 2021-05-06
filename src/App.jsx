import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { COMPETITIONS, HOME, LOGIN, NEW_COMPETITION } from "./const/routes";
import {
  CompetitionListPage,
  HomePage,
  LoginAndRegisterPage,
  NewCompetitionPage,
} from "./pages";
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
        <Route
          exact
          path={COMPETITIONS}
          component={WithLayout(CompetitionListPage)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
