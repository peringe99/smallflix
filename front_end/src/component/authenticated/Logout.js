import React from "react";
import { Redirect, useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  if (sessionStorage.getItem("token")) {
    sessionStorage?.removeItem("token");
    history.push("/");
  } else {
    <Redirect to="/" />;
  }

  return <div>Logout</div>;
};

export default Logout;
