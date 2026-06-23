'use client';

import React from 'react';
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
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import '../../styles/SingupOrSingin.css';

const Singup = () => {
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
            Join HireMatrix
          </Typography>
          <Typography className="auth-subtitle">
            Create your account and start your journey
          </Typography>
        </Box>

        {/* Form body */}
        <Box className="auth-card-body">
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            placeholder="John Doe"
            variant="outlined"
            name="fullName"
            className="auth-field"
            slotProps={{
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            placeholder="john.doe@example.com"
            variant="outlined"
            type="email"
            name="email"
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
            type="password"
            name="password"
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
                    <IconButton edge="end" size="small" suppressHydrationWarning>
                      <Visibility />
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            variant="outlined"
            type="tel"
            name="mobileNO"
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

          {/* Policy agreement */}
          <Box className="auth-policy-row">
            <Checkbox size="small" />
            <Typography className="auth-policy-text">
              I agree to the&nbsp;
              <Link href="#" className="auth-policy-link">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link href="#" className="auth-policy-link">
                Privacy Policy
              </Link>
              . By signing up, you consent to HireMatrix processing your personal data.
            </Typography>
          </Box>

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            className="auth-submit-btn"
            disableElevation
            suppressHydrationWarning
          >
            Create Account
          </Button>

          <Divider className="auth-divider">or</Divider>

          {/* Footer */}
          <Typography className="auth-footer">
            Already have an account?&nbsp;
            <Link href="/auth/Singin" className="auth-footer-link">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Singup;
