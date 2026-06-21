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
  FormHelperText,
} from '@mui/material';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import '../../styles/SingupOrSingin.css';
import { validateSignUpField } from '@/app/validations/authValidation';

// ─── Types ────────────────────────────────────────────────────

interface SignUpValues {
  fullName: string;
  email: string;
  password: string;
  mobileNO: string;
}

interface SignUpErrors {
  fullName: string;
  email: string;
  password: string;
  mobileNO: string;
  isAgree: string;
}

interface SignUpTouched {
  fullName: boolean;
  email: boolean;
  password: boolean;
  mobileNO: boolean;
  isAgree: boolean;
}

// ─── Component ────────────────────────────────────────────────

const Singup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState<SignUpValues>({
    fullName: '',
    email: '',
    password: '',
    mobileNO: '',
  });

  const [errors, setErrors] = useState<SignUpErrors>({
    fullName: '',
    email: '',
    password: '',
    mobileNO: '',
    isAgree: '',
  });

  const [touched, setTouched] = useState<SignUpTouched>({
    fullName: false,
    email: false,
    password: false,
    mobileNO: false,
    isAgree: false,
  });

  const [isAgree, setIsAgree] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateSignUpField(name, value) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof SignUpTouched]) {
      setErrors((prev) => ({ ...prev, [name]: validateSignUpField(name, value) }));
    }
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAgree(checked);
    setTouched((prev) => ({ ...prev, isAgree: true }));
    setErrors((prev) => ({
      ...prev,
      isAgree: checked ? '' : 'You must agree to the terms to continue',
    }));
  };

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
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && !!errors.fullName}
            helperText={touched.fullName ? errors.fullName : ''}
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

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            variant="outlined"
            type="tel"
            name="mobileNO"
            value={values.mobileNO}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobileNO && !!errors.mobileNO}
            helperText={touched.mobileNO ? errors.mobileNO : ''}
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
            <Checkbox
              size="small"
              checked={isAgree}
              onChange={handleAgreeChange}
            />
            <Box>
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
              {touched.isAgree && errors.isAgree && (
                <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                  {errors.isAgree}
                </FormHelperText>
              )}
            </Box>
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
