import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navBarContainer">
      <div className="logoutButton" onClick={handleLogoutClick}>
        Logout
      </div>
    </div>
  );
};

export default NavBar;
