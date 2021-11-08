import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./TransactionLine.css";

const TransactionLine = (props) => {
  const monthNames = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [transactionDate, setTransactionDate] = useState();

  const getForamttedDate = useCallback(() => {
    let convertedDate = new Date(Date.parse(props.date));
    return `${convertedDate.getDate()} ${monthNames[convertedDate.getMonth()]}`;
  }, [monthNames, props.date]);

  useEffect(() => {
    setTransactionDate(getForamttedDate());
  }, [getForamttedDate]);

  return (
    <div className="transactionLineContainer">
      <div className="date" style={{ textAlign: "left" }}>
        {transactionDate}
      </div>
      <div className="description">{props.description || "No description"}</div>
      <div
        className={`amount ${
          props.transactionType === "receive" && "greenFront"
        }`}
      >
        {`${props.transactionType === "receive" ? "+" : "-"}${props.amount}`}
      </div>
    </div>
  );
};

export default TransactionLine;
