// import React, { useEffect } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikContainer/FormikControl";
import { register } from "../../utilities/authservice";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Register() {
  const [serverError, setServerError] = useState("");

  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    const { name, email, password } = values;

    await register(name, email, password)
      .then((res) => {
        setServerError("");

        if (res.status === 201) {
          history.push("/login");
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
                    type="name"
                    name="name"
                    label="Name"
                  />

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
            If you have account? <Link to="/login">Sign in now.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
