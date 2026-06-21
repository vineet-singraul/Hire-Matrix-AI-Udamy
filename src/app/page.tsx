"use client";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 64;

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Mobile: temporary drawer overlay — only rendered on mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          <Sidebar isCollapsed={false} onToggle={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* Desktop: inline collapsible sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            flexShrink: 0,
            height: "100vh",
            overflow: "hidden",
            transition: "width 0.3s ease",
          }}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            onToggle={() => setIsCollapsed((prev) => !prev)}
          />
        </Box>
      )}

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
