import React from "react";
import routes from "../Router";
import { Link, useHistory } from "react-router-dom";

import "./NavbarRouter.css";

const NavbarRouter = () => {
  let history = useHistory();
  function logout() {
    if (sessionStorage.getItem("token")) {
      sessionStorage?.removeItem("token");
      history.push("/");
    }
  }
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Sign in</Link>
          </li>
          <li>
            <Link to="/register">Sign up</Link>
          </li>
          <li>
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          </li>
          <li>
            <Link to={{ pathname: "/category", state: "/category" }}>
              Category
            </Link>
          </li>
        </ul>
      </nav>{" "}
      {routes()}
    </>
  );
};

export default NavbarRouter;
