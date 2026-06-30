import type { CSSProperties } from "react";
import { Paper, Box, Typography, Link as MuiLink } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import styles from "@/app/styles/dashboard.module.css";

const activities = [
  {
    icon: <PersonAddAltOutlinedIcon sx={{ fontSize: 18 }} />,
    title: "New candidate applied",
    desc: "Rahul Sharma applied for Frontend Developer",
    time: "5 min ago",
    status: "New",
    color: "#22c55e",
  },
  {
    icon: <HubOutlinedIcon sx={{ fontSize: 18 }} />,
    title: "New match found",
    desc: "92% match for UI/UX Designer role",
    time: "2 hours ago",
    status: "Match",
    color: "#f97316",
  },
  {
    icon: <EventAvailableOutlinedIcon sx={{ fontSize: 18 }} />,
    title: "Interview scheduled",
    desc: "Priya Verma — Technical Round",
    time: "Yesterday",
    status: "Scheduled",
    color: "#a855f7",
  },
  {
    icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
    title: "Job posted",
    desc: "Backend Engineer position published",
    time: "Yesterday",
    status: "Published",
    color: "#3b82f6",
  },
  {
    icon: <AssessmentOutlinedIcon sx={{ fontSize: 18 }} />,
    title: "Report generated",
    desc: "Monthly hiring report is ready to view",
    time: "2 days ago",
    status: "Ready",
    color: "#002766",
  },
];

const DashboardRecentActivity = () => {
  return (
    <Paper elevation={0} className={styles.activityCard}>
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
        {activities.map((activity) => (
          <Box
            key={activity.title}
            className={styles.activityItem}
            style={{ "--accent": activity.color, "--accent-bg": `${activity.color}1A` } as CSSProperties}
          >
            <Box className={styles.activityIcon}>{activity.icon}</Box>

            <Box className={styles.activityContent}>
              <Box className={styles.activityTopRow}>
                <Typography className={styles.activityTitle}>{activity.title}</Typography>
                <Typography className={styles.activityTime}>{activity.time}</Typography>
              </Box>
              <Typography className={styles.activityDesc}>{activity.desc}</Typography>
              <span className={styles.activityBadge}>{activity.status}</span>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DashboardRecentActivity;
