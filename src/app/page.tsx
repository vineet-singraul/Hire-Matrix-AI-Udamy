"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? "64px" : "280px";

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          height: "100vh",
          overflowY: "auto",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        }}
      >
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </Box>

      {/* Main area — flexes automatically as sidebar resizes */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", minWidth: 0 }}>
        <Header />
        <Box sx={{ flex: 1, overflowY: "auto", p: 3, backgroundColor: "#f8fafc" }}>
          {/* Page content goes here */}
        </Box>
      </Box>
    </Box>
  );
}
