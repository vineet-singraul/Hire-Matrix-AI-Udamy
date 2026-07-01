"use client";
import {
  Box,
  Typography,
  TextField,
  Divider,
  Button,
  InputAdornment,
} from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import styles from "@/app/styles/settings.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { ChangePasswordFormData } from "@/types/dashboard.types";
import {
  onBlurValidationOfAllFiled,
  onChangeValidationAllFiled,
} from "@/app/validations/authValidation";
import { useLoader } from "@/context/LoaderContext";
import { apiPost } from "@/services/api";
import ApiResponseAlert from "@/app/components/common/ApiResponseAlert";
const passwordRequirements = [
  "At least 8 characters long",
  "One uppercase & one lowercase letter",
  "At least one number",
  "One special character (!@#$%)",
];

const securityTips = [
  "Never reuse a password from another site",
  "Avoid personal info like names or birthdays",
  "Change your password every few months",
  "Enable two-factor authentication for extra safety",
];

const ChangePassword = () => {
  const { showLoader, hideLoader } = useLoader();
  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordFormData, setChangePasswordFormData] =
    useState<ChangePasswordFormData>({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    severity: "success" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

  const handleChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const findChnages = onChangeValidationAllFiled(name, value);
    setError((prev) => ({ ...prev, [name]: findChnages }));
    setChangePasswordFormData((prev)=>({...prev, [name]:value}))
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const requiredFiledResponse = onBlurValidationOfAllFiled(name, value);
     if (requiredFiledResponse) {
        setError((prev) => ({ ...prev, [name]: requiredFiledResponse }));
        return
     }
    const findChnages = onChangeValidationAllFiled(name, value);
    setError((prev) => ({ ...prev, [name]: findChnages }));
  };

  const handleSubmitChangePassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const payload = {
      oldPassword: changePasswordFormData.currentPassword,
      newPassword: changePasswordFormData.newPassword,
      confirmPassword: changePasswordFormData.confirmNewPassword,
    };

    showLoader();
    try {
      await apiPost("/auth/change-password", payload);
      setChangePasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setError({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setNotification({
        open: true,
        severity: "success",
        message: "Password changed successfully.",
      });
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setNotification({
        open: true,
        severity: "error",
        message:
          axiosError?.response?.data?.message ?? "Failed to change password.",
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <Box className={styles.cpContainer}>
      <Box className={styles.cpFormSection}>
        <Box className={styles.cpHeader}>
          <Box className={styles.cpIconCircle}>
            <ShieldOutlinedIcon />
          </Box>
          <Box>
            <Typography className={styles.cpEyebrow}>
              Account Security
            </Typography>
            <Typography className={styles.cpTitle}>Change Password</Typography>
          </Box>
        </Box>

        <Divider className={styles.cpDivider} />

        <Box component="form" className={styles.cpForm}>
          <TextField
            label="Current Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            className={styles.cpField}
            name="currentPassword"
            placeholder="current password....."
            value={changePasswordFormData.currentPassword}
            onBlur={handleBlur}
            onChange={handleChnage}
            error={!!error?.currentPassword}
            helperText={error?.currentPassword}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {showPassword ? (
                      <VisibilityOutlinedIcon
                        fontSize="small"
                        className={styles.cpEyeIcon}
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        fontSize="small"
                        className={styles.cpEyeIcon}
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box className={styles.cpRow}>
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              name="newPassword"
              className={styles.cpField}
              placeholder="new password......"
              value={changePasswordFormData.newPassword}
              onBlur={handleBlur}
              onChange={handleChnage}
              error={!!error?.newPassword}
              helperText={error?.newPassword}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          fontSize="small"
                          className={styles.cpEyeIcon}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          fontSize="small"
                          className={styles.cpEyeIcon}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              className={styles.cpField}
              placeholder="confirm password......."
              name="confirmNewPassword"
              value={changePasswordFormData.confirmNewPassword}
              onBlur={handleBlur}
              onChange={handleChnage}
              error={!!error?.confirmNewPassword}
              helperText={error?.confirmNewPassword}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOutlinedIcon
                          fontSize="small"
                          className={styles.cpEyeIcon}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          fontSize="small"
                          className={styles.cpEyeIcon}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box className={styles.cpRequirements}>
            {passwordRequirements.map((req) => (
              <Box key={req} className={styles.cpRequirementItem}>
                <CheckCircleOutlinedIcon
                  fontSize="small"
                  className={styles.cpRequirementIcon}
                />
                <span>{req}</span>
              </Box>
            ))}
          </Box>

          <Divider className={styles.cpDivider} />

          <Box className={styles.cpActions}>
            <Box className={styles.cpLastChanged}>
              <HistoryToggleOffOutlinedIcon fontSize="small" />
              <span>Last changed 3 months ago</span>
            </Box>
            <Box className={styles.cpActionButtons}>
              <Button type="button" variant="outlined" className={styles.cpCancelBtn}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="contained"
                className={styles.cpSubmitBtn}
                onClick={handleSubmitChangePassword}
              >
                Update Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={styles.cpTipsPanel}>
        <Box className={styles.cpTipsIcon}>
          <GppGoodOutlinedIcon />
        </Box>
        <Typography className={styles.cpTipsTitle}>
          Keep your account safe
        </Typography>
        <Typography className={styles.cpTipsSubtitle}>
          A strong, unique password is your first line of defense.
        </Typography>

        <Box className={styles.cpTipsList}>
          {securityTips.map((tip) => (
            <Box key={tip} className={styles.cpTipItem}>
              <Box className={styles.cpTipDot} />
              <span>{tip}</span>
            </Box>
          ))}
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

export default ChangePassword;
