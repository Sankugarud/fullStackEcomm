import React from "react";
import "./Contact.css";
import  Button  from "@mui/material/Button";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:Ecomm@gmail.com">
        <p>Phone No: +91 9999999999</p>
        <Button>Contact: Ecomm@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;