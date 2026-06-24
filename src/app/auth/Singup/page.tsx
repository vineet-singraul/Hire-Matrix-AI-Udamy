"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
  Divider,
  Link,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  onBlurValidationOfAllFiled,
  onChangeValidationAllFiled,
} from "@/app/validations/authValidation";
import "../../styles/SingupOrSingin.css";
import { Errors } from "@/app/components/common/allInterface";
import React, { useState } from "react";
import { apiPost } from "@/services/api";
import ApiResponseAlert from "@/app/components/common/ApiResponseAlert";

const Singup = () => {
  const [password, setPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [error, setError] = useState<Errors>({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    severity: "success" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const validationError = onChangeValidationAllFiled(name, value);
    setError((prev) => ({ ...prev, [name]: validationError }));

    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobileNO: formData.mobile,
      isAgree: checked,
    };

    try {
      const response = await apiPost("/user/register", payload);
      console.log("<-----------Response when the user loggin --------> ",response)
      setNotification({
        open: true,
        severity: "success",
        message: response.message ?? "Registration successful!",
      });
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      setNotification({
        open: true,
        severity: "error",
        message:
          axiosError?.response?.data?.message ??
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Box className="auth-root" suppressHydrationWarning>
      <Box className="auth-bg" />
      <Box className="auth-card">
        <Box className="auth-card-header">
          <Box className="auth-logo-wrap" />
          <Typography variant="h5" className="auth-title">
            Join HireMatrix
          </Typography>
          <Typography className="auth-subtitle">
            Create your account and start your journey
          </Typography>
        </Box>

        <Box
          className="auth-card-body"
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Full Name"
            placeholder="John Doe"
            variant="outlined"
            name="fullName"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!error?.fullName}
            helperText={error?.fullName}
            className="auth-field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityOutlinedIcon />
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            placeholder="john.doe@example.com"
            variant="outlined"
            type="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            className="auth-field"
            error={!!error?.email}
            helperText={error?.email}
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

          <TextField
            fullWidth
            label="Password"
            placeholder="Secret@123"
            variant="outlined"
            type={password ? "text" : "password"}
            name="password"
            error={!!error?.password}
            helperText={error?.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="auth-field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => {
                        setPassword(!password);
                      }}
                      suppressHydrationWarning
                    >
                      {password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            variant="outlined"
            type="tel"
            name="mobile"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!error?.mobile}
            helperText={error?.mobile}
            className="auth-field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon />
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true, maxLength: 10 },
            }}
          />

          <Box className="auth-policy-row">
            <Checkbox
              size="small"
              onChange={(e) => {
                setChecked(!checked);
              }}
            />
            <Typography className="auth-policy-text">
              I agree to the&nbsp;
              <Link href="#" className="auth-policy-link">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link href="#" className="auth-policy-link">
                Privacy Policy
              </Link>
            </Typography>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="auth-submit-btn"
            disableElevation
            suppressHydrationWarning
          >
            Create Account
          </Button>

          <Divider className="auth-divider">or</Divider>

          <Typography className="auth-footer">
            Already have an account?&nbsp;
            <Link href="/auth/Singin" className="auth-footer-link">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>

     {notification.open && (
      <ApiResponseAlert
        severity={notification.severity}
        message={notification.message}
        onClose={closeNotification}
      />
    )}

    </Box>
  );
};

export default Singup;
