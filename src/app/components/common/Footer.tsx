'use client';

import { Box, Typography, Link as MuiLink } from "@mui/material";
import "@/app/styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box className="footer-container" component="footer">
      <Typography className="footer-text">
        © {year} RecruitPro. All rights reserved.
      </Typography>
      <Box className="footer-links">
        <MuiLink href="/settings" className="footer-link">
          Settings
        </MuiLink>
        <MuiLink href="/reports" className="footer-link">
          Reports
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Footer;
