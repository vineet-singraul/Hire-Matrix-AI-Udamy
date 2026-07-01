"use client";
import { Box, Typography, TextField, Divider, Button, Avatar, InputAdornment } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import styles from "@/app/styles/settings.module.css";

const General = () => {
  return (
    <Box className={styles.gpContainer}>
      <Box className={styles.gpProfileCard}>
        <Box className={styles.gpAvatarWrap}>
          <Avatar className={styles.gpAvatar}>JD</Avatar>
          <Box className={styles.gpAvatarBadge}>
            <PhotoCameraOutlinedIcon fontSize="small" />
          </Box>
        </Box>
        <Typography className={styles.gpName}>John Doe</Typography>
        <Typography className={styles.gpRole}>HR Manager</Typography>
      </Box>

      <Box className={styles.gpFormSection}>
        <Typography className={styles.cpEyebrow}>Personal Information</Typography>
        <Typography className={styles.cpTitle}>Profile Details</Typography>

        <Divider className={styles.cpDivider} />

        <Box component="form" className={styles.cpForm}>
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            className={styles.cpField}
            defaultValue="John Doe"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
              htmlInput: { suppressHydrationWarning: true },
            }}
          />

          <Box className={styles.cpRow}>
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              className={styles.cpField}
              defaultValue="john.doe@example.com"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
                htmlInput: { suppressHydrationWarning: true },
              }}
            />

            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              className={styles.cpField}
              defaultValue="+91 98765 43210"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
                htmlInput: { suppressHydrationWarning: true },
              }}
            />
          </Box>

          <Divider className={styles.cpDivider} />

          <Box className={styles.cpActions}>
            <Box className={styles.cpLastChanged}>
              <span>Last updated 2 weeks ago</span>
            </Box>
            <Box className={styles.cpActionButtons}>
              <Button
                type="button"
                variant="outlined"
                className={styles.cpCancelBtn}
                suppressHydrationWarning
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="contained"
                className={styles.cpSubmitBtn}
                suppressHydrationWarning
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default General;
