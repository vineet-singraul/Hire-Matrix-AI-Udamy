'use client';

import "@/app/styles/Sidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import HubIcon from "@mui/icons-material/Hub";
import EmailIcon from "@mui/icons-material/Email";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Jobs", icon: <WorkIcon /> },
    { text: "Candidate", icon: <PeopleIcon /> },
    { text: "Match Section", icon: <HubIcon /> },
    { text: "Email Campaign", icon: <EmailIcon /> },
    { text: "Report", icon: <AssessmentIcon /> },
  ];

  const bottomItems = [
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-logo">
        {!isCollapsed && <h2>RecruitPro</h2>}
        <IconButton onClick={onToggle} className="sidebar-toggle">
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </div>

      <List className="sidebar-menu">
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={isCollapsed ? item.text : ""} placement="right">
            <ListItemButton className="sidebar-item">
              <ListItemIcon className="sidebar-icon">{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <div className="sidebar-footer">
        <Divider className="sidebar-divider" />
        {bottomItems.map((item) => (
          <Tooltip key={item.text} title={isCollapsed ? item.text : ""} placement="right">
            <ListItemButton className="sidebar-item">
              <ListItemIcon className="sidebar-icon">{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
