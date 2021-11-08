import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NavBar from "../NavBar/NavBar";
import CustomSnackBar from "../../CommonComponents/CustomSnackBar/CustomSnackBar";
import CustomButton from "../../CommonComponents/CustomButton/CustomButton";
import TransactionLine from "../TransactionLine/TransactionLine";
import CustomBackdrop from "../../CommonComponents/CustomBackdrop/CustomBackdrop";
import axios from "axios";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleMakeTransferClick = () => {
    navigate("/make-transfer");
  };

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

  const getBalanceCallback = useCallback(() => {
    setIsBackdropOpen(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}account/balances`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.balance) {
          setBalance(response.data.balance);
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
  }, [handleBackEndError]);

  const getTransactionsCallback = useCallback(() => {
    setIsBackdropOpen(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}account/transactions`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setTransactions(response.data.data);
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
  }, [handleBackEndError]);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/no-access");
    } else {
      getBalanceCallback();
      getTransactionsCallback();
    }
  }, [getBalanceCallback, getTransactionsCallback, navigate]);

  return (
    <div className="dashboaedContainer">
      <NavBar />
      <CustomBackdrop
        open={isBackdropOpen}
        handleClose={() => setIsBackdropOpen(false)}
      />
      <CustomSnackBar
        open={isSnackbarOpen}
        severity={snackBarSeverity}
        message={snackBarMessage}
        handleClose={() => setIsSnackbarOpen(false)}
      />
      <div className="dashboardPage">
        <div className="summaryContainer">
          <div style={{ fontWeight: 500 }}>You have</div>
          <div style={{ marginTop: "5%", fontSize: "25px" }}>
            SGD{" "}
            <span style={{ fontWeight: 700 }}>
              {balance &&
                balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          <div style={{ fontWeight: 500, marginTop: "5%" }}>
            In your account
          </div>
        </div>
        <div className="transactionsContainer">
          <div style={{ fontWeight: 700, color: "#dd54a5" }}>Your activity</div>
          <div className="transactionTableHeader">
            <div className="headerText">Date</div>
            <div className="headerText">Description</div>
            <div className="headerText" style={{ textAlign: "right" }}>
              Amount
            </div>
          </div>
          {transactions.map((data) => (
            <TransactionLine
              date={data.date}
              description={data.description}
              amount={data.amount}
              transactionType={data.type}
            />
          ))}
        </div>
      </div>
      <div className="footer">
        <CustomButton
          id="makeTransferButton"
          buttonText="Make a transfer"
          buttonClick={handleMakeTransferClick}
          icon={<CompareArrowsIcon />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
