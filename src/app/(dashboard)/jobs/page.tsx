import { Box, Typography } from "@mui/material";

export default function JobsPage() {
  return (
    <Box>
      <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1f2937", mb: 1 }}>
        Jobs
      </Typography>
      <Typography sx={{ fontSize: "0.82rem", color: "#6b7280" }}>
        Job listings will appear here.
      </Typography>
    </Box>
  );
}
