"use client";

import { Box, keyframes } from "@mui/material";

const spinCW = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const spinCCW = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1);    opacity: 1; }
  50%       { transform: scale(0.85); opacity: 0.6; }
`;

const Loader = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>

    <Box sx={{ position: "relative", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>

      {/* Outer ring — clockwise */}
      <Box
        sx={{
          position: "absolute",
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#002766",
          borderBottomColor: "#640089",
          animation: `${spinCW} 1.4s linear infinite`,
        }}
      />

      {/* Inner ring — counter-clockwise */}
      <Box
        sx={{
          position: "absolute",
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#d900c7",
          borderBottomColor: "#003ba8",
          animation: `${spinCCW} 1s linear infinite`,
        }}
      />

      {/* Centre dot */}
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #3b82f6, #1e3a6e)",
          boxShadow: "0 0 12px 4px rgba(59,130,246,0.45)",
          animation: `${pulse} 1.4s ease-in-out infinite`,
        }}
      />
    </Box>

    {/* Label */}
    <Box
      component="span"
      sx={{
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        background: "linear-gradient(135deg, #3b82f6, #1e3a6e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      HireMatrix
    </Box>

  </Box>
);

export default Loader;
