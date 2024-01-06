import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/action/usercalled";
import "./ForgetPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert.success("Email Send Successfuly")
    // Dispatch the forgotPassword action with the provided email
    dispatch(forgotPassword({email}));

  };

  return (
    <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">

      <h2 className="forgotPasswordHeading">Forgot Password</h2>
      <form className="forgotPasswordForm" onSubmit={handleSubmit}>
        <div className="forgotPasswordEmail">
          <MailOutlineIcon />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit" className="forgotPasswordBtn">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default ForgotPassword;