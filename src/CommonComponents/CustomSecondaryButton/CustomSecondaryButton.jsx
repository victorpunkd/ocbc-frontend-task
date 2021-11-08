import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  buttonStyle: {
    // backgroundImage:
    //   "linear-gradient(to right,#fd898e,#f97a91,#f26c96,#e95f9d,#dd54a5)",
    border: "1px solid #dd54a5",
    fontSize: "15px",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(221, 84, 165, .2)",
    color: "#dd54a5",
    height: 48,
    padding: "0 30px",
    marginTop: "8%",
  },
});

const CustomSecondaryButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      fullWidth
      className={classes.buttonStyle}
      endIcon={props.icon}
      onClick={props.buttonClick}
    >
      {props.buttonText}
    </Button>
  );
};

export default CustomSecondaryButton;
