import { Box, Typography, IconButton, Badge, Avatar } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "@/app/styles/Header.css";

interface HeaderProps {
  onMobileMenuClick?: () => void;
}

const Header = ({ onMobileMenuClick }: HeaderProps) => {
  const userName = "John Doe";

  return (
    <Box className="header-container">
      {/* Left Section */}
      <Box className="header-left-section">
        {/* Hamburger — mobile only */}
        <IconButton
          onClick={onMobileMenuClick}
          sx={{ display: { xs: "flex", md: "none" }, color: "#ffffff", p: "6px" }}
        >
          <MenuIcon />
        </IconButton>
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
            {userName.split(" ").map((w) => w[0]).join("")}
          </Avatar>
          <Typography
            variant="body1"
            className="header-user-name"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {userName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
