import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const userFormValidationSchema = yup.object({
  name: yup
    .string()
    .required()
    .min(4, "User Name Must be alteast 4 Characters Long"),
  password: yup
    .string()
    .required("Password is Mandatory")
    .min(8, "Must be atleast 8 Characters Long")
    .max(12, "Not More than 12 Characters"),
  email: yup
    .string()
    .email("Must be a valid email ID")
    .required("User Email is Mandatory"),
});
const SignUp = () => {
  const navigate = useNavigate();
  const [success, setsuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userSignUp = async (signUpData) => {
    try {
      const response = await axios.post(
        "https://password-reset-serverapp.onrender.com/user/signup",
        JSON.stringify(signUpData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      setsuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 403) {
        setErrorMessage("User Exists Already. Please Sign In");
      } else if (err.response?.status === 403) {
        setErrorMessage("Error While Siging Up");
      } else {
        setErrorMessage("SignUp Failes");
      }
    }
  };
  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: userFormValidationSchema,
      onSubmit: (data) => {
        userSignUp(data);
      },
    });

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}

      {success ? (
        <div className="signin-container">
          <h1>You Have Succefully Signed Up</h1>
          <div className="further-action-text">
            <Nav.Link onClick={() => navigate("/signin")}>
              {" "}
              Go to Sign In
            </Nav.Link>
          </div>
        </div>
      ) : (
        <div className="signin-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label className="label-text">UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />

              {touched.name && errors.name ? (
                <Alert variant="danger">{errors.name}</Alert>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-text">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email ? (
                <Alert variant="danger">{errors.email}</Alert>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label-text">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password ? (
                <Alert variant="danger">{errors.password}</Alert>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="signup-text">
                Already Signed Up!!!{" "}
                <Nav.Link onClick={() => navigate("/signin")}>
                  Sign in Here
                </Nav.Link>
              </div>
            </Form.Group>

            <div className="submit-btn">
              <Button variant="contained" size="medium" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
export default SignUp;
