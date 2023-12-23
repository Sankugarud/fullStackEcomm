import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import "../NotFound/NotFound.css";
import { Link } from "react-router-dom";

const NotAccess = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />
      <p>Can Not Access</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotAccess;