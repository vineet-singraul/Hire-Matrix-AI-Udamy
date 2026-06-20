import {
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "@/app/styles/Header.css";

const Header = () => {
  const userName = "John Doe";

  return (
    <Box className="header-container">
      {/* Left Section */}
      <Box className="header-left-section">
        <Typography variant="h6" className="header-title">
          Dashboard
        </Typography>
      </Box>

      {/* Right Section */}
      <Box className="header-right-section">
        <IconButton className="header-notification-icon" size="large">
          <Badge badgeContent={4} className="header-notification-badge">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>

        <Box className="header-user-section">
          <Avatar className="header-avatar">
            {userName
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </Avatar>
          <Typography variant="body1" className="header-user-name">
            {userName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;