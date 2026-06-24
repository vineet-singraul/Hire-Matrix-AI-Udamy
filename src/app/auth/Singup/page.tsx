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
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
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
import {useLoader} from "@/context/LoaderContext"

const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resending, setResending] = useState(false);
  const { showLoader, hideLoader } = useLoader();

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

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobileNO: formData.mobile,
      isAgree: checked,
    };
    showLoader();
    try {
      await apiPost("/user/register", payload);
      setRegisteredEmail(formData.email);
      setEmailSent(true);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setNotification({
        open: true,
        severity: "error",
        message:
          axiosError?.response?.data?.message ??
          "Something went wrong. Please try again.",
      });
    } finally {
      hideLoader();
    }
  };

  const handleResend = async () => {
    setResending(true);
    showLoader();
    try {
      await apiPost("/auth/resend-verification", { email: registeredEmail });
      setNotification({
        open: true,
        severity: "success",
        message: "Verification email resent successfully.",
      });
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setNotification({
        open: true,
        severity: "error",
        message:
          axiosError?.response?.data?.message ?? "Failed to resend email.",
      });
    } finally {
      setResending(false);
      hideLoader();
    }
  };

  if (emailSent) {
    return (
      <Box className="auth-root" suppressHydrationWarning>
        <Box className="auth-bg" />
        <Box className="auth-card">
          <Box className="auth-card-header">
            <Box className="auth-logo-wrap">
              <MarkEmailReadOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
            <Typography variant="h5" className="auth-title">
              Check Your Email
            </Typography>
            <Typography className="auth-subtitle">
              A verification link has been sent
            </Typography>
          </Box>

          <Box className="auth-card-body" sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.82rem", color: "#374151", mb: 1 }}>
              We sent a verification link to
            </Typography>
            <Typography
              sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e3a6e", mb: 1.5 }}
            >
              {registeredEmail}
            </Typography>
            <Typography sx={{ fontSize: "0.76rem", color: "#6b7280", mb: 2.5 }}>
              Click the link in the email to activate your account. Check your
              spam folder if you don&apos;t see it.
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleResend}
              disabled={resending}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "0.82rem",
                height: "40px",
                mb: 2,
                borderColor: "#3b82f6",
                color: "#3b82f6",
                "&:hover": { borderColor: "#1e3a6e", color: "#1e3a6e" },
              }}
            >
              {resending ? "Sending..." : "Resend verification email"}
            </Button>

            <Typography className="auth-footer">
              Already verified?&nbsp;
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
  }

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

        <Box className="auth-card-body" component="form" onSubmit={handleSubmit}>
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
            type={showPassword ? "text" : "password"}
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
                      onClick={() => setShowPassword(!showPassword)}
                      suppressHydrationWarning
                    >
                      {showPassword ? <Visibility /> : <VisibilityOffOutlinedIcon />}
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
            <Checkbox size="small" onChange={() => setChecked(!checked)} />
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
