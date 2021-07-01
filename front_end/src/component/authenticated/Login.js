// import React, { useEffect } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikContainer/FormikControl";
import { login } from "../../utilities/authservice";
import "./Login.css";

import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [serverError, setServerError] = useState("");

  const history = useHistory();

  const initialValues = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    const { email, password } = values;

    await login(email, password)
      .then((res) => {
        setServerError("");
        sessionStorage.setItem("token", res.data.token);

        if (res.data.token) {
          history.push(history.location?.state || "/");
        }
      })
      .catch((err) => {
        setServerError(err.response?.data.msg);
      });
  };

  return (
    <div className="login_container">
      <div className="login_content">
        <div className="form-main">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    label="Email address"
                  />

                  <FormikControl
                    control="input"
                    type="password"
                    label="Password"
                    name="password"
                  />
                  <span className="serverError">{serverError}</span>
                  <div className="container-log-btn">
                    <button
                      className={
                        !formik.isValid
                          ? "form-btn  form-btn-notvalid"
                          : "form-btn form-btn-valid"
                      }
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      Sign in
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p className="p_signup">
            New to Netflix? <Link to="/">Sign up now.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
