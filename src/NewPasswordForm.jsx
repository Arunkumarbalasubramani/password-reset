import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";
import { Nav } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is Mandatory")
    .min(8, "Minimum 4 Characters required")
    .max(12, "Max 12 Characters Allowed"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const NewPasswordForm = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const changePasswordFunction = async (data) => {
    const passwordToBeChanged = { password: data.password };

    try {
      setLoading(true);
      const response = await axios.post(
        `https://password-reset-serverapp.onrender.com/api/reset-password/${id}/${token}`,
        JSON.stringify(passwordToBeChanged),
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
        setLoading(false);
      } else if (error?.response.status === 404) {
        setError("  User Not Found.Please Sign Up");
        setLoading(false);
      } else {
        console.log(error.response);
        setError(` ${error.response.data.Message}`);
        setLoading(false);
      }
    }
    // try {
    //
    // } catch (err) {
    //
    // }
  };
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmpassword: "",
      },
      validationSchema: passwordValidationSchema,
      onSubmit: (data) => {
        changePasswordFunction(data);
      },
    });
  return (
    <>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      {loading ? <CircularProgress color="success" /> : null}
      {success ? (
        <div className="signin-container">
          <h1>Password Has been Changed Successfully</h1>
          <div className="further-action-text">
            <Nav.Link onClick={() => navigate("/signin")}>
              {" "}
              Go Back to Sign In Page
            </Nav.Link>
          </div>
        </div>
      ) : (
        <div className="signin-container">
          <h1>Enter New Password</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-text">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                name="password"
                className="input-textbox"
                value={values.password}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password ? (
                <Alert variant="danger">{errors.password}</Alert>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-text">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="ReEnter New Password"
                name="confirmpassword"
                className="input-textbox"
                value={values.confirmpassword}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onBlur={handleBlur}
                error={touched.confirmpassword && errors.confirmpassword}
              />
              {touched.confirmpassword && errors.confirmpassword ? (
                <Alert variant="danger">{errors.confirmpassword}</Alert>
              ) : null}
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

export default NewPasswordForm;
