import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { checkIsAuthenticated } from "src/utilities/authservice";
let st = {
  fontSize: "30px",
  color: "red",
  zIndex: 4,
  textAlign: "center",
};

const Protected = () => {
  const history = useHistory();
  useEffect(() => {
    checkIsAuthenticated(history);
  }, [history]);

  return <div style={st}>I'm Protected Page</div>;
};

export default Protected;
