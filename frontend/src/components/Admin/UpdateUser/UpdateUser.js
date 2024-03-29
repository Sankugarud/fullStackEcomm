import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import  Button  from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { updateUserReset } from "../../redux/action/userAction";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../redux/action/usercalled";
import Loader from "../../Layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    console.log(error)
    console.log(updateError)
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
     
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
            dispatch({ type: updateUserReset });
      navigate("/products", { replace: true });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);
  useEffect(() => {
    if (isUpdated) {
      window.location.reload(); 
    }
  }, [isUpdated]);
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm ={
      name:name,
      email:email,
      role:role
    };

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <div className="productDashboard">
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;