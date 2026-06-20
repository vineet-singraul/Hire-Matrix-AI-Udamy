'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../styles/SingupOrSingin.css';

const Singin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className="auth-root" suppressHydrationWarning>
      {/* Corporate background */}
      <Box className="auth-bg" />

      {/* Card */}
      <Box className="auth-card">
        {/* Header banner */}
        <Box className="auth-card-header">
          <Box className="auth-logo-wrap" />
          <Typography variant="h5" className="auth-title">
            Welcome Back
          </Typography>
          <Typography className="auth-subtitle">
            Sign in to continue to HireMatrix
          </Typography>
        </Box>

        {/* Form body */}
        <Box className="auth-card-body">
          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            placeholder="john.doe@example.com"
            variant="outlined"
            type="email"
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

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            placeholder="Secret@123"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
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
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                      suppressHydrationWarning
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          {/* Remember me + Forgot password row */}
          <Box className="singin-options-row">
            <Box className="singin-remember-row">
              <Checkbox size="small" className="singin-checkbox" />
              <Typography className="singin-remember-text">Remember me</Typography>
            </Box>
            <Link href="#" className="auth-policy-link singin-forgot-link">
              Forgot password?
            </Link>
          </Box>

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            className="auth-submit-btn"
            disableElevation
            suppressHydrationWarning
          >
            Sign In
          </Button>

          <Divider className="auth-divider">or</Divider>

          {/* Footer */}
          <Typography className="auth-footer">
            Don&apos;t have an account?&nbsp;
            <Link href="/auth/Singup" className="auth-footer-link">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Singin;
