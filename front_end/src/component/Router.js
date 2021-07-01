import React from "react";
import { Route, Switch } from "react-router";

import LandingPage from "./LandingComponent/LandingPage";
import Login from "./authenticated/Login";
import NoMatch from "./NoMatch";

import Register from "./authenticated/Register";
import Category from "./Movies/Category";

const Router = () => {
  // const getAuth = async () => {
  //   console.log("inside click");
  //   await checkIsAuthenticated()
  //     .then((response) => {
  //       setIsAuthenticated(response.data.isAuthenticated);
  //     })
  //     .catch((err) => {
  //       setIsAuthenticated(err.response.data.isAuthenticated);
  //     });
  // };

  // const checkAuth = () => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     return false;
  //   }
  //   return true;
  // };

  // function PrivateRoute({ children, ...rest }) {
  //   getAuth();
  //   console.log("Clicked --", isAuthenticated);
  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) => {
  //         return checkAuth() === true ? (
  //           children
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: "/login",
  //               state: { from: location },
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // }
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
