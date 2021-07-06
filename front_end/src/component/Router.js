import React from "react";
import { Route, Switch } from "react-router";

import LandingPage from "./LandingComponent/LandingPage";
import Login from "./authenticated/Login";
import NoMatch from "./NoMatch";

import Register from "./authenticated/Register";
import Category from "./Movies/Category";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/category" component={Category} />
      <Route path={"*"} component={NoMatch} />
    </Switch>
  );
};

export default Router;
