import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import Loader from '../../Layout/Loader/Loader';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../redux/action/usercalled";
// import { useAlert } from "react-alert";
import { updateProfileReset } from "../../redux/action/userAction";
// import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      name:name,
      email:email,
      avatar:avatarPreview
    }

    dispatch(updateProfile(myForm));
  };

  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/profile");
        
      dispatch({
        type: updateProfileReset,
      });
    }
  }, [dispatch, error, history, user,navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          {/* <MetaData title="Update Profile" /> */}
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;