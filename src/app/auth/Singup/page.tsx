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
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import '../../styles/SingupOrSingin.css';

const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className="auth-root" suppressHydrationWarning>
      {/* Corporate background */}
      <Box className="auth-bg" />

      {/* Card */}
      <Box className="auth-card">
        {/* Header banner */}
        <Box className="auth-card-header">
          <Box className="auth-logo-wrap">
            {/* <WorkOutlineIcon sx={{ fontSize: 32, color: '#ffffff' }} /> */}
          </Box>
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
            className="auth-field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <PersonOutlineIcon /> */}
                  </InputAdornment>
                ),
              },
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

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            variant="outlined"
            type="tel"
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
