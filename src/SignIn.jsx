import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const loginValidationSchema = yup.object({
  name: yup
    .string()
    .required("User Name is Mandatory")
    .min(4, "Minimu 4 Characters required"),
  password: yup
    .string()
    .required("Password is Mandatory")
    .min(8, "Minimum 8 Characters Only")
    .max(12, "Maximum 12 Characters only"),
});
const SignIn = () => {
  const navigate = useNavigate();
  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginFunction = async (loginData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://password-reset-serverapp.onrender.com/api/user/signin",
        JSON.stringify(loginData),
        { headers: { "Content-Type": "application/json" } }
      );
      setsuccess(true);
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrorMessage("No Server Response");
        setLoading(false);
      } else if (err?.response.status === 404) {
        setErrorMessage("  User Not Found.Please Sign Up");
        setLoading(false);
      } else if (err?.response.status === 403) {
        setErrorMessage("Wrong Credentials");
        setLoading(false);
      } else {
        console.log(err.response);
        setErrorMessage(` ${err.response.data.Error}`);
        setLoading(false);
      }
    }
  };
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: (data) => {
        loginFunction(data);
      },
    });

  return (
    <>
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
      {loading ? <CircularProgress color="success" /> : null}
      {success ? (
        <div className="signin-container">
          <h1>You are Succefully Logged In</h1>
          <div className="further-action-text">
            <Nav.Link onClick={() => navigate("/home")}> Go to Home</Nav.Link>
          </div>
        </div>
      ) : (
        <div className="signin-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-text">User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                name="name"
                value={values.name}
                error={touched.name && errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-textbox"
              />
              {touched.name && errors.name ? (
                <Alert variant="danger">{errors.name}</Alert>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label-text">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input-textbox"
              />
              {touched.password && errors.password ? (
                <Alert variant="danger">{errors.password}</Alert>
              ) : null}
            </Form.Group>
            <Form.Group
              className="mb-3 helper-text"
              controlId="formBasicPassword"
            >
              <div className="signup-text">
                Not a User!!!{" "}
                <Nav.Link onClick={() => navigate("/signup")}>
                  SignUp Here
                </Nav.Link>
              </div>
              <div className="signup-text">
                Forgot Your Password ???
                <Nav.Link onClick={() => navigate("/password-reset")}>
                  Reset Here
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

export default SignIn;
