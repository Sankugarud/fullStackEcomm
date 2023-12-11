import React, { useState } from "react";
import "./ResetPassword.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/action/usercalled"; // Import your action
import { useParams,useNavigate  } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwords = {
    newPassword:newPassword,
    confirmPassword:confirmPassword
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the resetPassword action with the token and password
    dispatch(resetPassword(token, passwords));

    navigate("/signin");
  };

  return (
    <div className="resetPasswordContainer">
      <h2 className="resetPasswordHeading">Reset Password</h2>
      <form className="resetPasswordForm" onSubmit={handleSubmit}>
        <div className="resetPasswordInput">
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div className="resetPasswordInput">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit" className="resetPasswordBtn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
