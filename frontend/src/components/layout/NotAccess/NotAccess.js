import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "../NotFound/NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotAccess = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Can Not Access</Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotAccess;