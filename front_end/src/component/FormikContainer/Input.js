import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, name, control_lab, ...rest } = props;
  return (
    <div className="group form-input">
      <Field id={name} name={name} {...rest} />
      <label className="lab" htmlFor={name}>
        {label}
      </label>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;
