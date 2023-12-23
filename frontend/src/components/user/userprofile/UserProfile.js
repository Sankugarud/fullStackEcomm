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
      <div className="profileContainer">
        <div className="user-image-container">
          <h1>My Profile</h1>
          <img src={user.avatar.url} alt="User Avatar" className="user-image" />
          <Link to="/update-profile">Edit Profile</Link>
        </div>
        <div className="user-details">
          <div>
              <h4>Full Name</h4>
              <p className="user-name">{user.name}</p>
          </div>
         <div>
              <h4>Email</h4>
              <p className="user-email">{user.email}</p>
          </div>
          <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <h4>Your Role</h4>
                <p className="user-role">{user.role}</p>
              </div>
          
               <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/change-password">Update Password</Link>
               </div>
                
        </div>
      </div>
      
    )}
      
    </div>
  );
};

export default UserProfile;
