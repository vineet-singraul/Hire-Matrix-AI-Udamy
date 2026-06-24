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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "../../styles/SingupOrSingin.css";
import {
  onBlurValidationOfAllFiled,
  onChangeValidationAllFiled,
} from "@/app/validations/authValidation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/services/api";
import { useLoader } from "@/context/LoaderContext";
import ApiResponseAlert from "@/app/components/common/ApiResponseAlert";

const Singin = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resending, setResending] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

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
    setUnverifiedEmail("");

    const payload = { email: formData.email, password: formData.password };

    showLoader();
    try {
      const response = await apiPost("/user/login", payload);

      // Store user data in localStorage per AUTH_API_DOCS
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("phone", response.data.mobileNO);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email.toLowerCase());
      }

      setNotification({
        open: true,
        severity: "success",
        message: response.message ?? "Login successful! Redirecting...",
      });

      setTimeout(() => router.push("/"), 1500);
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { status?: number; data?: { message?: string } };
      };
      const status = axiosError?.response?.status;
      const message =
        axiosError?.response?.data?.message ??
        "Something went wrong. Please try again.";

      if (status === 403) {
        // Email not yet verified — show resend option
        setUnverifiedEmail(formData.email);
        setNotification({ open: true, severity: "warning", message });
      } else {
        setNotification({ open: true, severity: "error", message });
      }
    } finally {
      hideLoader();
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    showLoader();
    try {
      await apiPost("/auth/resend-verification", { email: unverifiedEmail });
      setNotification({
        open: true,
        severity: "success",
        message: "Verification email resent. Please check your inbox.",
      });
      setUnverifiedEmail("");
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

  return (
    <Box className="auth-root" suppressHydrationWarning>
      <Box className="auth-bg" />

      <Box className="auth-card">
        <Box className="auth-card-header">
          <Box className="auth-logo-wrap" />
          <Typography variant="h5" className="auth-title">
            Welcome Back
          </Typography>
          <Typography className="auth-subtitle">
            Sign in to continue to HireMatrix
          </Typography>
        </Box>

        <Box className="auth-card-body" component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            placeholder="john.doe@example.com"
            variant="outlined"
            type="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!error?.email}
            helperText={error.email}
            className="auth-field"
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
            onBlur={handleBlur}
            onChange={handleChange}
            error={!!error?.password}
            helperText={error.password}
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
                      suppressHydrationWarning
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          <Box className="singin-options-row">
            <Box className="singin-remember-row">
              <Checkbox
                size="small"
                className="singin-checkbox"
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Typography className="singin-remember-text">
                Remember me
              </Typography>
            </Box>
            <Link href="/auth/forgot-password" className="auth-policy-link singin-forgot-link">
              Forgot password?
            </Link>
          </Box>

          {/* 403 — email not verified banner */}
          {unverifiedEmail && (
            <Box
              sx={{
                background: "#fff7ed",
                border: "1px solid #f97316",
                borderRadius: "8px",
                p: "10px 14px",
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", color: "#92400e" }}>
                Email not verified yet.
              </Typography>
              <Button
                size="small"
                disabled={resending}
                onClick={handleResendVerification}
                sx={{
                  fontSize: "0.72rem",
                  textTransform: "none",
                  color: "#ea580c",
                  p: "2px 8px",
                  minWidth: 0,
                  "&:hover": { background: "#ffedd5" },
                }}
              >
                {resending ? "Sending..." : "Resend email"}
              </Button>
            </Box>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="auth-submit-btn"
            disableElevation
            suppressHydrationWarning
          >
            Sign In
          </Button>

          <Divider className="auth-divider">or</Divider>

          <Typography className="auth-footer">
            Don&apos;t have an account?&nbsp;
            <Link href="/auth/Singup" className="auth-footer-link">
              Sign up
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

export default Singin;
