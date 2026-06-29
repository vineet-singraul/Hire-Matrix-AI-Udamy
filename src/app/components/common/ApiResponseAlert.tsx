import { Snackbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { ApiResponseAlertProps } from "./allInterface";

const severityConfig = {
  success: {
    icon: <CheckIcon sx={{ color: "#fff", fontSize: 16 }} />,
    iconBg: "#22c55e",
    titleColor: "#22c55e",
    label: "SUCCESS",
  },
  warning: {
    icon: <WarningAmberIcon sx={{ color: "#fff", fontSize: 16 }} />,
    iconBg: "#eab308",
    titleColor: "#eab308",
    label: "WARNING",
  },
  error: {
    icon: <CloseIcon sx={{ color: "#fff", fontSize: 16 }} />,
    iconBg: "#ef4444",
    titleColor: "#ef4444",
    label: "ERROR",
  },
  info: {
    icon: <InfoOutlinedIcon sx={{ color: "#fff", fontSize: 16 }} />,
    iconBg: "#3b82f6",
    titleColor: "#3b82f6",
    label: "INFO",
  },
};

const ApiResponseAlert = ({ severity, message, onClose }: ApiResponseAlertProps) => {
  const config = severityConfig[severity];

  return (
    <Snackbar
      open
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#1c1c1e",
          borderRadius: "10px",
          padding: "10px 14px",
          minWidth: "220px",
          maxWidth: "320px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Circular icon */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: config.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {config.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: config.titleColor,
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "2px",
            }}
          >
            {config.label}
          </div>
          <div style={{ color: "#d1d5db", fontSize: "11px", lineHeight: 1.4 }}>
            {message}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            color: "#9ca3af",
            flexShrink: 0,
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </button>
      </div>
    </Snackbar>
  );
};

export default ApiResponseAlert;
