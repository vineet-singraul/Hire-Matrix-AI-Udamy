'use client';

import { useState } from "react";
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
  const [activeItem, setActiveItem] = useState("Dashboard");

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

  const itemClass = (text: string) =>
    `sidebar-item${activeItem === text ? " sidebar-item-active" : ""}`;

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>

      {/* ── Brand ── */}
      <div className="sidebar-logo">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">RP</div>
          {!isCollapsed && (
            <div className="sidebar-brand-text">
              <h2>RecruitPro</h2>
              <span className="sidebar-logo-sub">Hiring Platform</span>
            </div>
          )}
        </div>
        <IconButton onClick={onToggle} className="sidebar-toggle">
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </div>

      {/* ── Main navigation ── */}
      {!isCollapsed && <div className="sidebar-section-label">Navigation</div>}

      <List className="sidebar-menu">
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={isCollapsed ? item.text : ""} placement="right">
            <ListItemButton
              className={itemClass(item.text)}
              onClick={() => setActiveItem(item.text)}
            >
              <ListItemIcon className="sidebar-icon">{item.icon}</ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      {/* ── Footer ── */}
      <div className="sidebar-footer">
        <Divider className="sidebar-divider" />
        {!isCollapsed && <div className="sidebar-section-label" style={{ paddingTop: 6 }}>Account</div>}
        {bottomItems.map((item) => (
          <Tooltip key={item.text} title={isCollapsed ? item.text : ""} placement="right">
            <ListItemButton
              className={itemClass(item.text)}
              onClick={() => setActiveItem(item.text)}
            >
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
