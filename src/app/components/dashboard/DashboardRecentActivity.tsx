import type { CSSProperties, ReactNode } from "react";
import { Paper, Box, Typography, Link as MuiLink } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import styles from "@/app/styles/dashboard.module.css";
import type {
  ActivityType,
  RecentActivityItem,
} from "@/app/components/common/allInterface";

interface DashboardRecentActivityProps {
  activities: RecentActivityItem[];
}

const APPEARANCE_BY_TYPE: Record<ActivityType, { icon: ReactNode; color: string }> = {
  application: { icon: <PersonAddAltOutlinedIcon sx={{ fontSize: 18 }} />, color: "#22c55e" },
  match: { icon: <HubOutlinedIcon sx={{ fontSize: 18 }} />, color: "#f97316" },
  interview: { icon: <EventAvailableOutlinedIcon sx={{ fontSize: 18 }} />, color: "#a855f7" },
  job: { icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} />, color: "#3b82f6" },
  report: { icon: <AssessmentOutlinedIcon sx={{ fontSize: 18 }} />, color: "#002766" },
};

const DashboardRecentActivity = ({ activities }: DashboardRecentActivityProps) => {
  return (
    <Paper elevation={0} className={styles.activityCard} suppressHydrationWarning>
      <Box className={styles.activityHeader}>
        <Box>
          <Typography className={styles.cardTitle}>Recent Activity</Typography>
          <Typography className={styles.cardSubtitle}>
            Latest updates across your hiring pipeline
          </Typography>
        </Box>
        <MuiLink href="#" className={styles.activityViewAll}>
          View all
        </MuiLink>
      </Box>

      <Box className={styles.activityList}>
        {activities.length === 0 ? (
          <Typography className={styles.cardSubtitle}>No recent activity yet.</Typography>
        ) : (
          activities.map((activity, index) => {
            const { icon, color } = APPEARANCE_BY_TYPE[activity.type];
            return (
              <Box
                key={`${activity.type}-${activity.title}-${index}`}
                className={styles.activityItem}
                style={{ "--accent": color, "--accent-bg": `${color}1A` } as CSSProperties}
                suppressHydrationWarning
              >
                <Box className={styles.activityIcon}>{icon}</Box>

                <Box className={styles.activityContent}>
                  <Box className={styles.activityTopRow}>
                    <Typography className={styles.activityTitle}>{activity.title}</Typography>
                    <Typography className={styles.activityTime}>{activity.time}</Typography>
                  </Box>
                  <Typography className={styles.activityDesc}>{activity.desc}</Typography>
                  <span className={styles.activityBadge}>{activity.status}</span>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Paper>
  );
};

export default DashboardRecentActivity;
