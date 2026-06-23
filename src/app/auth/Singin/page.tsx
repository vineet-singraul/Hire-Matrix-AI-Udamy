'use client';

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
import '../../styles/SingupOrSingin.css';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useState } from 'react';

const Singin = () => {
  const [password, setPassword] = useState(false);
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

        <Box className="auth-card-body">
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

          <TextField
            fullWidth
            label="Password"
            placeholder="Secret@123"
            variant="outlined"
            type={password ? "password" : "text"}
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
                    <IconButton edge="end" size="small" suppressHydrationWarning onClick={()=>{setPassword(!password)}}>
                      {password ? <VisibilityOffOutlinedIcon/> : <Visibility /> }
                    </IconButton>
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          <Box className="singin-options-row">
            <Box className="singin-remember-row">
              <Checkbox size="small" className="singin-checkbox" />
              <Typography className="singin-remember-text">Remember me</Typography>
            </Box>
            <Link href="#" className="auth-policy-link singin-forgot-link">
              Forgot password?
            </Link>
          </Box>

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
