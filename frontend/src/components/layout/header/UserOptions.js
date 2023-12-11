import React, { Fragment, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action/usercalled";
import { toast } from 'react-toastify';



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
    {
      icon: (
        <ShoppingCartIcon
          // style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      // name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: handleLogout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
    handleClose();
  }

  function orders() {
    navigate("/orders");
    handleClose();
  }

  function account() {
    navigate("/profile");
    handleClose();
  }

  function cart() {
    navigate("/cart");
    handleClose();
  }


function handleLogout() {
  dispatch(logoutUser());
  toast.success("Logout Successfully"); // Use toast.success instead of alert.success
  navigate("/products");
  handleClose();
}


  return (
    <Fragment>
      <div onClick={handleClick}>
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
    </Fragment>
  );
};

export default UserOptions;
