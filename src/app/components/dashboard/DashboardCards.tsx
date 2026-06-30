"use client";

import type { CSSProperties, ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import styles from "@/app/styles/dashboard.module.css";
import type { DashboardCard } from "@/app/components/common/allInterface";

interface DashboardCardsProps {
  cards: DashboardCard[];
}

interface CardAppearance {
  icon: ReactNode;
  color: string;
}

const APPEARANCE_BY_KEYWORD: { keyword: string; icon: ReactNode; color: string }[] = [
  { keyword: "job", icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 20 }} />, color: "#3b82f6" },
  { keyword: "candidate", icon: <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />, color: "#22c55e" },
  { keyword: "match", icon: <HubOutlinedIcon sx={{ fontSize: 20 }} />, color: "#f97316" },
  { keyword: "response", icon: <TrendingUpOutlinedIcon sx={{ fontSize: 20 }} />, color: "#a855f7" },
];

const DEFAULT_APPEARANCE: CardAppearance = {
  icon: <InsightsOutlinedIcon sx={{ fontSize: 20 }} />,
  color: "#002766",
};

const getAppearance = (label: string): CardAppearance => {
  const match = APPEARANCE_BY_KEYWORD.find((entry) =>
    label.toLowerCase().includes(entry.keyword)
  );
  return match ?? DEFAULT_APPEARANCE;
};

const DashboardCards = ({ cards }: DashboardCardsProps) => {
  if (!cards.length) {
    return null;
  }

  return (
    <div className={styles.statsGrid} suppressHydrationWarning>
      {cards.map((card) => {
        const { icon, color } = getAppearance(card.label);
        return (
          <Paper
            key={card.label}
            elevation={0}
            className={styles.statCard}
            style={{ "--accent": color, "--accent-bg": `${color}1A` } as CSSProperties}
            suppressHydrationWarning
          >
            <Box className={styles.statIcon}>{icon}</Box>
            <Box className={styles.statTextWrap}>
              <Typography className={styles.statValue}>{card.value}</Typography>
              <Typography className={styles.statLabel}>{card.label}</Typography>
            </Box>
          </Paper>
        );
      })}
    </div>
  );
};

export default DashboardCards;
