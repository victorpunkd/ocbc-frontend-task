import React from "react";
import "./NoAccess.css";
import { useNavigate } from "react-router-dom";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import CustomButton from "../CustomButton/CustomButton";

const NoAccess = () => {
  const navigate = useNavigate();
  const handleLoginNavigateClick = () => {
    navigate("/");
  };
  return (
    <div className="noAccessContainer">
      <div className="noAccessBody">
        <NoAccountsIcon style={{ fontSize: "55px", color: "#96281b" }} />
        <div className="warningText">Please login to continue</div>
        <div style={{ marginTop: "2%" }}>
          <CustomButton
            buttonText="Take me to login page"
            buttonClick={handleLoginNavigateClick}
          />
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
