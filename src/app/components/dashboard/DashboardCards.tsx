import { Paper, Box, Typography } from "@mui/material";
import type { CSSProperties } from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import WorkIcon from '@mui/icons-material/Work';
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import styles from "@/app/styles/dashboard.module.css";

const cards = [
  {
    label: "Total Jobs",
    value: "0",
    icon: <WorkIcon sx={{ fontSize: 20 }} />,
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
    <div className={styles.statsGrid}>
      {cards.map((card) => (
        <Paper
          key={card.label}
          elevation={0}
          className={styles.statCard}
          style={{ "--accent": card.color, "--accent-bg": `${card.color}1A` } as CSSProperties}
        >
          <Box className={styles.statIcon}>{card.icon}</Box>

          <Box className={styles.statTextWrap}>
            <Typography className={styles.statValue}>{card.value}</Typography>
            <Typography className={styles.statLabel}>{card.label}</Typography>
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default DashboardCards;
