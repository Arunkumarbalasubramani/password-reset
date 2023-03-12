import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="signin-container">
      <h1>Welcome to Home Page</h1>

      <IconButton aria-label="back" size="large" onClick={() => navigate("/")}>
        <ArrowBackIosNewIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default Home;
