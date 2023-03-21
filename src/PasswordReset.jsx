import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import { Nav } from "react-bootstrap";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        "https://password-reset-serverapp.onrender.com/api/user/passwordreset",
        { email }
      );

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error.response) {
        setError("No Server response");
        setLoading(false);
      } else if (error?.response.status === 404) {
        setError("User Does Not Exists. Please Sign UP");
        setLoading(false);
      } else {
        setError(` ${error.response.data.Error}`);

        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  return (
    <>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      {loading ? <CircularProgress color="success" /> : null}
      {success ? (
        <div className="signin-container">
          <h1>We Have Sent You a Mail With Reset Link. Check Your Mail</h1>
          <div className="further-action-text">
            <Nav.Link onClick={() => navigate("/signin")}>
              {" "}
              Go Back to Sign In Page
            </Nav.Link>
          </div>
        </div>
      ) : (
        <div className="signin-container">
          <h1>Enter Your Email for a Password Reset</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label-text">Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email Address"
                name="name"
                className="input-textbox"
                value={email}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
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

export default PasswordReset;
