"use client";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper, Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import styles from "@/app/styles/dashboard.module.css";
import type {
  CandidateGrowthData,
  JobVsCandidateData,
} from "@/app/components/common/allInterface";

const BRAND_COLOR = "#002766";
const BRAND_LIGHT = "#003f87cb";
const BRAND_DARK = "#22374a";

interface DashboardChartsProps {
  candidateGrowth: CandidateGrowthData;
  jobVsCandidate: JobVsCandidateData;
}

const DashboardCharts = ({ candidateGrowth, jobVsCandidate }: DashboardChartsProps) => {
  const hasGrowthData = candidateGrowth.labels.length > 0;
  const hasComparisonData = jobVsCandidate.labels.length > 0;

  return (
    <div className={styles.chartsGrid} suppressHydrationWarning>
      <Paper elevation={0} className={styles.card}>
        <Box className={styles.cardHeader}>
          <Box className={styles.cardIcon}>
            <TrendingUpOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography className={styles.cardTitle}>Candidate Growth</Typography>
        </Box>
        <Box className={styles.chartBody}>
          {hasGrowthData ? (
            <LineChart
              xAxis={[
                {
                  data: candidateGrowth.labels,
                  scaleType: "point",
                },
              ]}
              series={[
                {
                  id: "trend",
                  data: candidateGrowth.data,
                  area: true,
                  color: BRAND_DARK,
                },
              ]}
            >
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRAND_DARK} stopOpacity={0.55} />
                  <stop offset="50%" stopColor={BRAND_COLOR} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={BRAND_LIGHT} stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </LineChart>
          ) : (
            <Typography className={styles.cardSubtitle}>No growth data yet.</Typography>
          )}
        </Box>
      </Paper>

      <Paper elevation={0} className={styles.card}>
        <Box className={styles.cardHeader}>
          <Box className={styles.cardIcon}>
            <InsightsOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography className={styles.cardTitle}>Jobs VS Candidates</Typography>
        </Box>
        <Box className={styles.chartBody}>
          {hasComparisonData ? (
            <BarChart
              series={[
                { data: jobVsCandidate.jobs, label: "Jobs", id: "jobsId", color: BRAND_COLOR },
                { data: jobVsCandidate.candidates, label: "Candidates", id: "candidatesId", color: BRAND_LIGHT },
              ]}
              xAxis={[{ data: jobVsCandidate.labels, height: 28 }]}
              yAxis={[{ width: 50 }]}
            />
          ) : (
            <Typography className={styles.cardSubtitle}>No comparison data yet.</Typography>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default DashboardCharts;
