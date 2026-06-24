import { Snackbar, Alert } from "@mui/material";
import type { ApiResponseAlertProps } from "./allInterface";

const ApiResponseAlert = ({ severity, message, onClose }: ApiResponseAlertProps) => {
  return (
    <Snackbar
      open
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ApiResponseAlert;
