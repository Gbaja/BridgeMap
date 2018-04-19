import React, { Component } from "react";
import { render } from "react-dom";
import { withFormik, Form, Field } from "formik";
import Yup from "yup";
import { graphql } from "react-apollo";

import mutation from "../../mutations/login";

const login = ({ errors, touched }) => {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <button>Submit</button>
    </Form>
  );
};

const Formiklogin = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string().required("Please enter a password!")
  }),
  handleSubmit(values, { props, resetForm }) {
    //console.log(values);
    props
      .mutate({
        variables: {
          email: values.email,
          password: values.password
        }
      })
      .then(res => {
        console.log(res);
        resetForm();
      });
  }
})(login);

export default graphql(mutation)(Formiklogin);
