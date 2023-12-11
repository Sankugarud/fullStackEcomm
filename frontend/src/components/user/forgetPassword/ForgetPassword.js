import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/action/usercalled";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the forgotPassword action with the provided email
    dispatch(forgotPassword({email}));

  };

  return (
    <div className="forgotPasswordContainer">
      <h2 className="forgotPasswordHeading">Forgot Password</h2>
      <form className="forgotPasswordForm" onSubmit={handleSubmit}>
        <div className="forgotPasswordInput">
          <label>Email:</label>
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
  );
};

export default ForgotPassword;
