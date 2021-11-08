import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import CustomButton from "../../CommonComponents/CustomButton/CustomButton";
import CustomSnackBar from "../../CommonComponents/CustomSnackBar/CustomSnackBar";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import CustomBackdrop from "../../CommonComponents/CustomBackdrop/CustomBackdrop";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [errorState, setErrorState] = useState({});

  const handleChange = (type, event) => {
    if (type === "userName") {
      setUserName(event.target.value);
    } else if (type === "password") {
      setPassword(event.target.value);
    }
  };

  const validateDetails = () => {
    const errors = {};
    if (!userName) {
      errors["userName"] = "Required";
    }
    if (!password) {
      errors["password"] = "Required";
    }
    return errors;
  };

  const handleLoginClick = () => {
    const errors = validateDetails();
    setErrorState(errors);
    if (Object.keys(errors).length !== 0) {
      setErrorState(errors);
      return;
    } else {
      setErrorState({});
    }
    loginUser();
  };

  const handleBackEndError = (error) => {
    setIsSnackbarOpen(true);
    setSnackBarMessage(error?.response?.data?.description || "");
    setSnackBarSeverity("error");
  };

  useEffect(() => {
    sessionStorage.removeItem("token");
  }, []);

  const loginUser = () => {
    setIsBackdropOpen(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}authenticate/login`, {
        username: userName,
        password: password,
      })
      .then((response) => {
        if (
          response.data &&
          response.data.status &&
          response.data.status === "success"
        ) {
          if (response.data.token) {
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        if (error.response.data && error.response.data.status) {
          handleBackEndError(error);
        }
      })
      .finally(() => {
        setIsBackdropOpen(false);
      });
  };

  return (
    <div className="loginPageContainer">
      <CustomSnackBar
        open={isSnackbarOpen}
        severity={snackBarSeverity}
        message={snackBarMessage}
        handleClose={() => setIsSnackbarOpen(false)}
      />
      <CustomBackdrop
        open={isBackdropOpen}
        handleClose={() => setIsBackdropOpen(false)}
      />
      <div className="loginForm">
        <div className="headingText">Hi there!</div>
        <div className="subHeadingText">Login with your credentials</div>
        <div style={{ marginTop: "3%" }}>
          <div className="formControls">
            <TextField
              label="Username"
              id="username"
              error={errorState["userName"]}
              fullWidth
              variant="outlined"
              className="textField"
              value={userName}
              onChange={(event) => handleChange("userName", event)}
            />
          </div>
          <div className="formControls">
            <TextField
              label="Password"
              id="password"
              fullWidth
              className="textField"
              error={errorState["password"]}
              type={"password"}
              variant="outlined"
              value={password}
              onChange={(event) => handleChange("password", event)}
            />
          </div>
        </div>
        <div style={{ marginTop: "5%" }}>
          <CustomButton
            id="loginButton"
            buttonText="Login"
            buttonClick={handleLoginClick}
            icon={<LoginIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
