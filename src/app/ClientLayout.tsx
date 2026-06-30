"use client";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/app/components/common/Header";
import Sidebar from "@/app/components/common/Sidebar";

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 52;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthRoute = pathname.startsWith("/auth");

  if (isAuthRoute) {
    return <>{children}</>;
  }

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
              overflow: "hidden",
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

      {/* Main area — Header + dynamic page content */}
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
          {children}
        </Box>
      </Box>
    </Box>
  );
}
