import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const SuccessSignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        margin: "100px",
      }}
    >
      <h1>
        You have successfully signed up. We have sent password to your Email.
        Please login with that password
      </h1>
      <Button variant="contained" color="primary">
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          Login
        </Link>
      </Button>
    </div>
  );
};

export default SuccessSignUp;
