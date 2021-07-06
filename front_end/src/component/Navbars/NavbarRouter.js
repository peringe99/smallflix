import React from "react";
import routes from "../Router";
import { Link, useHistory } from "react-router-dom";
// import logoImage from '../../../public/images/';

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
      <a href="/">
        <img
          className="smallflixLogo"
          src={process.env.PUBLIC_URL + "/images/smallflix-logo.png"}
          alt="SmallflixLogo"
        />
      </a>
      <nav className="nav">
        <div className="menuIcon"></div>
        <div className="menuIcon"></div>
        <div className="menuIcon"></div>
        <ul className="dropContent">
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
