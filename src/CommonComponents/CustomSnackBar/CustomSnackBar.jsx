import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
