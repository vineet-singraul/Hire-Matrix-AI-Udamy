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
import { validateSignInField } from '@/app/validations/authValidation';

// ─── Types ────────────────────────────────────────────────────

interface SignInValues {
  email: string;
  password: string;
}

interface SignInErrors {
  email: string;
  password: string;
}

interface SignInTouched {
  email: boolean;
  password: boolean;
}

// ─── Component ────────────────────────────────────────────────

const Singin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState<SignInValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<SignInErrors>({ email: '', password: '' });
  const [touched, setTouched] = useState<SignInTouched>({ email: false, password: false });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateSignInField(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof SignInTouched]) {
      setErrors((prev) => ({ ...prev, [name]: validateSignInField(name, value) }));
    }
  };

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
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email ? errors.email : ''}
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
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && !!errors.password}
            helperText={touched.password ? errors.password : ''}
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
