import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../layout/Loader/Loader";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./userProfile.css"; // Import your CSS file

const UserProfile = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="user-profile-container">
       {loading ? (
      <Loader />
    ) : (
      <div>
        <div className="user-image-container">
          <img src={user.avatar.url} alt="User Avatar" className="user-image" />
        </div>
        <div className="user-details">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <p className="user-role">{user.role}</p>
          <Link to="/update-profile">
           
            <button className="profile-btn">Change Profile</button>
          </Link>
          <Link to="/change-password">
            <button className="profile-btn">Update Password</button>
          </Link>
        </div>
      </div>
      
    )}
      
    </div>
  );
};

export default UserProfile;
