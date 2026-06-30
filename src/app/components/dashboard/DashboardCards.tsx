import { Grid, Paper, Box, Typography } from "@mui/material";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

const cards = [
  {
    label: "Total Jobs",
    value: "0",
    // icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />,
    color: "#3b82f6",
  },
  {
    label: "Candidates",
    value: "0",
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />,
    color: "#22c55e",
  },
  {
    label: "Matches",
    value: "0",
    icon: <HubOutlinedIcon sx={{ fontSize: 20 }} />,
    color: "#f97316",
  },
  {
    label: "Reports",
    value: "0",
    icon: <AssessmentOutlinedIcon sx={{ fontSize: 20 }} />,
    color: "#a855f7",
  },
];

const DashboardCards = () => {
  return (
    <Grid container spacing={1.5}>
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 6, sm: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: "10px",
              border: "1px solid #e5e9f0",
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "9px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: card.color,
                backgroundColor: `${card.color}1A`,
              }}
            >
              {card.icon}
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#1f2937", lineHeight: 1.2 }}
              >
                {card.value}
              </Typography>
              <Typography
                sx={{ fontSize: "0.72rem", color: "#6b7280", whiteSpace: "nowrap" }}
              >
                {card.label}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;
