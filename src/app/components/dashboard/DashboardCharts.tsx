import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Paper, Box, Typography } from "@mui/material";
import styles from "@/app/styles/dashboard.module.css";

const BRAND_COLOR = "#002766";
const BRAND_LIGHT = "#003f87cb";

const BRAND_DARK = "#22374a";

const DashboardCharts = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Jan", "Feb", "Mar", "Apr","May","Jun", "Jul","Aug", "Sep","Oct", "Nov", "Dec",
    ];
  return (
    <div className={styles.chartsGrid}>
      <Paper elevation={0} className={styles.card}>
        <Box className={styles.cardHeader}>
          <Typography className={styles.cardTitle}>Candidate Growth</Typography>
        </Box>
        <Box className={styles.chartBody}>
          <LineChart
            xAxis={[
              {
                data: [ "Jan", "Feb", "Mar", "Apr","May","Jun", "Jul","Aug", "Sep","Oct", "Nov", "Dec",],
                scaleType: "point",
              },
            ]}
            series={[
              {
                id: "trend",
                data: [2,3,6.2],
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
        </Box>
      </Paper>

      <Paper elevation={0} className={styles.card}>
        <Box className={styles.cardHeader}>
          <Typography className={styles.cardTitle}>Jobs VS Candidates</Typography>
        </Box>
        <Box className={styles.chartBody}>
          <BarChart
            series={[
              { data: pData, label: "pv", id: "pvId", color: BRAND_COLOR },
              { data: uData, label: "uv", id: "uvId", color: BRAND_LIGHT },
            ]}
            xAxis={[{ data: xLabels, height: 28 }]}
            yAxis={[{ width: 50 }]}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default DashboardCharts;
