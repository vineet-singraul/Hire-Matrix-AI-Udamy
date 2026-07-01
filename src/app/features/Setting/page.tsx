"use client";

import * as React from "react";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import styles from "@/app/styles/settings.module.css";
import General from "@/app/components/settings/General";
import ChangePassword from "@/app/components/settings/ChangePassword";

const settingsNav = [
  { label: "General", icon: TuneOutlinedIcon },
  { label: "Notifications", icon: NotificationsNoneOutlinedIcon },
  { label: "Account", icon: PersonOutlineOutlinedIcon },
  { label: "Change password", icon: LockResetOutlinedIcon },
  { label: "About us", icon: InfoOutlinedIcon },
  { label: "Contact us", icon: ContactMailOutlinedIcon },
  { label: "Policy", icon: PolicyOutlinedIcon },
];

const Page = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <Box className={styles.settingsShell}>
      <Box className={styles.settingsSidebar}>
        <IconButton
          className={styles.settingsCloseBtn}
          onClick={() => router.back()}
          aria-label="Close settings"
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box className={styles.settingsNavList}>
          {settingsNav.map((item, index) => {
            const ItemIcon = item.icon;
            const isActive = value === index;
            return (
              <Box
                key={item.label}
                role="button"
                tabIndex={0}
                className={`${styles.settingsNavItem} ${
                  isActive ? styles.settingsNavItemActive : ""
                }`}
                onClick={() => setValue(index)}
              >
                <ItemIcon fontSize="small" />
                <span>{item.label}</span>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box className={styles.settingsContent}>
        <Typography className={styles.settingsContentTitle}>
          {settingsNav[value].label}
        </Typography>
        <Divider className={styles.settingsContentDivider} />

        <Box className={styles.settingsContentBody}>
          {value === 0 && <General />}
          {value === 3 && <ChangePassword />}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
