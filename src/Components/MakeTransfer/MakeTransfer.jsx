import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MakeTransfer.css";
import NavBar from "../NavBar/NavBar";
import CustomButton from "../../CommonComponents/CustomButton/CustomButton";
import CustomSecondaryButton from "../../CommonComponents/CustomSecondaryButton/CustomSecondaryButton";
import CustomSnackBar from "../../CommonComponents/CustomSnackBar/CustomSnackBar";
import CustomBackdrop from "../../CommonComponents/CustomBackdrop/CustomBackdrop";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const MakeTransfer = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errorState, setErrorState] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const handleBackEndError = useCallback(
    (error) => {
      setIsSnackbarOpen(true);
      setSnackBarMessage(error?.response?.data?.description || "");
      setSnackBarSeverity("error");
      sessionStorage.removeItem("token");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    [navigate]
  );

  const getRecipients = useCallback(() => {
    setIsBackdropOpen(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}account/payees`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.data)
          setRecipient(response.data.data);
      })
      .catch((error) => {
        if (error.response.data && error.response.data.status) {
          handleBackEndError(error);
        }
      })
      .finally(() => {
        setIsBackdropOpen(false);
      });
  }, [handleBackEndError]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/no-access");
    } else {
      getRecipients();
    }
  }, [navigate, getRecipients]);

  const handleRecipientChange = (event) => {
    setSelectedRecipient(event.target.value);
  };

  const handleDateChange = (newValue) => {
    let todaysDate = new Date();
    if (todaysDate.setHours(0, 0, 0, 0) <= newValue.setHours(0, 0, 0, 0)) {
      setTransactionDate(newValue);
    } else {
      setIsSnackbarOpen(true);
      setSnackBarSeverity("warning");
      setSnackBarMessage("Transaction date cant be less than todays date");
    }
  };

  const handleTextBoxChange = (type, event) => {
    if (type === "description") {
      setDescription(event.target.value);
    } else if (type === "amount") {
      if (!event.target.value.match(/[%<>\\$'"]/)) {
        setAmount(event.target.value); // only set when successful
      }
    }
  };

  const handleCancelClick = () => {
    navigate("/dashboard");
  };

  const validateDetails = () => {
    const errors = {};
    if (!selectedRecipient) {
      errors["selectedRecipient"] = "Required";
    }
    if (!transactionDate) {
      errors["transactionDate"] = "Required";
    }
    if (!description) {
      errors["description"] = "Required";
    }
    if (!amount) {
      errors["amount"] = "Required";
    }
    return errors;
  };

  const makeTransfer = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}transfer`,
        {
          recipientAccountNo: selectedRecipient,
          amount: amount,
          date: transactionDate,
          description: description,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (
          response.data &&
          response.data.status &&
          response.data.status === "success"
        ) {
          setIsSnackbarOpen(true);
          setSnackBarSeverity("success");
          setSnackBarMessage("Transaction completed");
        }
      })
      .catch((error) => {
        if (error.response.data && error.response.data.status) {
          handleBackEndError(error);
        }
      })
      .finally(() => {
        setIsBackdropOpen(false);
        setSelectedRecipient("");
        setTransactionDate(new Date());
        setDescription("");
        setAmount("");
      });
  };

  const handleMakeTransferClick = () => {
    const errors = validateDetails();
    setErrorState(errors);
    if (Object.keys(errors).length !== 0) {
      setErrorState(errors);
      return;
    } else {
      setErrorState({});
    }
    makeTransfer();
  };

  return (
    <div className="makeTransferContainer">
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
      <NavBar />
      <div className="transferForm">
        <div style={{ fontSize: "25px", fontWeight: 700, color: "#dd54a5" }}>
          Make a transfer
        </div>
        <div className="formCenter">
          <div>
            <FormControl fullWidth error={errorState["selectedRecipient"]}>
              <InputLabel fullWidth id="demo-simple-select-helper-label">
                Select Recipient
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedRecipient}
                label="Select Recipient"
                style={{ textAlign: "left" }}
                onChange={handleRecipientChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {recipient.map((data) => (
                  <MenuItem value={data.accountNo || ""}>
                    {data.accountHolderName || ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="formElement">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of transfer"
                id="datePicker"
                inputFormat="MM/dd/yyyy"
                fullWidth
                value={transactionDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="formElement">
            <TextField
              label="Description"
              fullWidth
              id="description"
              className="textField"
              error={errorState["description"]}
              variant="outlined"
              value={description}
              onChange={(event) => handleTextBoxChange("description", event)}
            />
          </div>
          <div className="formElement">
            <TextField
              label="Amount"
              id="amount"
              fullWidth
              type="number"
              className="textField"
              error={errorState["amount"]}
              variant="outlined"
              value={amount}
              onChange={(event) => handleTextBoxChange("amount", event)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="buttonHolder">
          <CustomSecondaryButton
            id="cancel"
            buttonText="Cancel"
            buttonClick={handleCancelClick}
            icon={<CloseIcon />}
          />
        </div>
        <div className="buttonHolder">
          <CustomButton
            id="submit"
            buttonText="Submit"
            buttonClick={handleMakeTransferClick}
            icon={<PublishIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default MakeTransfer;
