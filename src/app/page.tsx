"use client";
import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Mobile: temporary drawer overlay */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
        }}
      >
        <Sidebar isCollapsed={false} onToggle={() => setMobileOpen(false)} />
      </Drawer>

      {/* Desktop: inline collapsible sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
          flexShrink: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </Box>

      {/* Main area — Header + Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", minWidth: 0 }}>
        <Header onMobileMenuClick={() => setMobileOpen(true)} />
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 2, sm: 2.5, md: 3 },
            backgroundColor: "#dee9f3",
          }}
        >
          {/* Page content goes here */}
        </Box>
      </Box>
    </Box>
  );
}
