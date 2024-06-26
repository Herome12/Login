import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../../../action/UserAction";

import HomeIcon from '@mui/icons-material/Home';




const UserOptions = ({ user }) => {
  

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
 const dispatch = useDispatch();

  const options = [
    {icon:<HomeIcon/>,name:"Home",func:home},
    
    { icon: <PersonIcon />, name: "Profile", func: account },
    
     { icon: <ExitToAppIcon />, name: "Logout", func: logout },
    
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function home(){
    navigate("/")
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
   function cart() {
     navigate("/cart");
  }
  function logout() { 
    dispatch(logoutUser());
    // alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;