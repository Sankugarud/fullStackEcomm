import React, { Fragment, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action/usercalled";
import { toast } from 'react-toastify';
import {loginReset, registerReset } from "../../redux/action/userAction";
import './Navbar.css'


const UserOptions = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    
    { icon: <ExitToAppIcon />, name: "Logout", func: handleLogout },
  ];
if(user){
  if (user.role === "admin") {
    options.unshift(
      { icon: <DashboardIcon />, name: "Admin", func: admin } 
    );
  }
}
 

  function orders() {
    navigate("/orders");
    handleClose();
  }

  function account() {
    navigate("/profile");
    handleClose();
  }



  function admin() {
    navigate("/admin/dashboard");
    handleClose();
  }

  function handleLogout() {
    dispatch({type:loginReset});
    dispatch({type:registerReset});
    dispatch(logoutUser());
  
    toast.success("Logout Successfully");
    navigate("/products");
    handleClose();
  }

  return (
    <Fragment>
      <div className="chooseMenu">
      <div onClick={handleClick} className="arrow_Dropdown">
        Dashboard <ArrowDropDownIcon />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={option.func}>
            {option.icon} {option.name}
          </MenuItem>
        ))}
      </Menu>
      </div>
      
    </Fragment>
  );
};

export default UserOptions;