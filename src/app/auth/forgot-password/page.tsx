"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import "../../styles/SingupOrSingin.css";
import React, { useState } from "react";
import {
  onBlurValidationOfAllFiled,
  onChangeValidationAllFiled,
} from "@/app/validations/authValidation";
import { apiPost } from "@/services/api";
import ApiResponseAlert from "@/app/components/common/ApiResponseAlert";

const ForgotPassword = () => {
  const [error, setError] = useState({
    email: "",
  });

  const [formData, setFormData] = useState({
    email: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    severity: "success" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const closeNotification = () => {  
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationError = onChangeValidationAllFiled(name, value);
    setError((prev) => ({ ...prev, [name]: validationError }));
    if (validationError === "") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const requiredError = onBlurValidationOfAllFiled(name, value);
    if (requiredError) {
      setError((prev) => ({ ...prev, [name]: requiredError }));
      return;
    }
    const validationError = onChangeValidationAllFiled(name, value);
    setError((prev) => ({ ...prev, [name]: validationError }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email !== "") {
      const payload = {
        email: formData.email,
      };
      const response = await apiPost("/auth/forgot-password", payload);
      setNotification({
        open: true,
        severity: "success",
        message: response.message?? "Reset email send to you'r mail...",
      });
    }
  };


  return (
    <>
      <Box className="auth-root" suppressHydrationWarning>
        <Box className="auth-bg" />

        <Box className="auth-card">
          <Box className="auth-card-header">
            <Box className="auth-logo-wrap">
              <LockResetOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
            <Typography variant="h5" className="auth-title">
              Forgot Password?
            </Typography>
            <Typography className="auth-subtitle">
              Enter your email and we&apos;ll send you a reset link
            </Typography>
          </Box>

          <Box
            className="auth-card-body"
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Email Address"
              placeholder="john.doe@example.com"
              variant="outlined"
              type="email"
              name="email"
              className="auth-field"
              onBlur={handleBlur}
              onChange={handleOnchange}
              error={!!error?.email}
              helperText={error.email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                },
                htmlInput: { suppressHydrationWarning: true },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              className="auth-submit-btn"
              disableElevation
              suppressHydrationWarning
            >
              Send Reset Link
            </Button>

            <Typography
              className="auth-footer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <ArrowBackOutlinedIcon sx={{ fontSize: 14 }} />
              <Link href="/auth/Singin" className="auth-footer-link">
                Back to Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

    {notification.open && (
      <ApiResponseAlert
        severity={notification.severity}
        message={notification.message}
        onClose={closeNotification}
      />
    )}

    </>
  );
};

export default ForgotPassword;
