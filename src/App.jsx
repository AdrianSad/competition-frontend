import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  COMPETITION,
  COMPETITIONS,
  HOME,
  LOGIN,
  NEW_COMPETITION,
} from "./const/routes";
import {
  CompetitionListPage,
  CompetitionPage,
  HomePage,
  LoginAndRegisterPage,
  NewCompetitionPage,
} from "./pages";
import WithLayout from "./hoc/Layout/WithLayout";
import withAuthentication from "./hoc/Auth/withAuthentication";

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
          component={withAuthentication(WithLayout(NewCompetitionPage))}
        />
        <Route
          exact
          path={COMPETITIONS}
          component={withAuthentication(WithLayout(CompetitionListPage))}
        />
        <Route
          exact
          path={COMPETITION(":id")}
          component={withAuthentication(WithLayout(CompetitionPage))}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
