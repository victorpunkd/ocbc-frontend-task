import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  buttonStyle: {
    backgroundImage:
      "linear-gradient(to right,#fd898e,#f97a91,#f26c96,#e95f9d,#dd54a5)",
    border: 0,
    fontSize: "15px",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "8%",
  },
});

const CustomButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      fullWidth
      id={props.id}
      className={classes.buttonStyle}
      endIcon={props.icon}
      onClick={props.buttonClick}
    >
      {props.buttonText}
    </Button>
  );
};

export default CustomButton;
