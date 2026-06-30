"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import DashboardCards from "@/app/components/dashboard/DashboardCards";
import DashboardRecentActivity from "@/app/components/dashboard/DashboardRecentActivity";
import ApiResponseAlert from "@/app/components/common/ApiResponseAlert";
import { apiGet } from "@/services/api";
import { useLoader } from "@/context/LoaderContext";
import type {
  DashboardApiPayload,
  DashboardCard,
  CandidateGrowthData,
  JobVsCandidateData,
  RecentActivityItem,
} from "@/app/components/common/allInterface";

const DashboardCharts = dynamic(
  () => import("@/app/components/dashboard/DashboardCharts"),
  { ssr: false }
);

interface DashboardFetchDetailsResponse {
  status: boolean;
  data: {
    cards: {
      totalJobs: number;
      totalCandidates: number;
      totalAiMatches: number;
      responseRate: number;
    };
    candidateGrowth: { month: string; total: number }[];
  };
}

// Recent activity has no live endpoint yet (see A_Dashboard_API.md) — kept static until one exists.
const STATIC_RECENT_ACTIVITY: RecentActivityItem[] = [
  {
    type: "application",
    title: "New candidate applied",
    desc: "Rahul Sharma applied for Frontend Developer",
    time: "5 min ago",
    status: "New",
  },
  {
    type: "match",
    title: "New match found",
    desc: "92% match for UI/UX Designer role",
    time: "2 hours ago",
    status: "Match",
  },
  {
    type: "interview",
    title: "Interview scheduled",
    desc: "Priya Verma — Technical Round",
    time: "Yesterday",
    status: "Scheduled",
  },
  {
    type: "job",
    title: "Job posted",
    desc: "Backend Engineer position published",
    time: "Yesterday",
    status: "Published",
  },
  {
    type: "report",
    title: "Report generated",
    desc: "Monthly hiring report is ready to view",
    time: "2 days ago",
    status: "Ready",
  },
];

const mapDashboardResponse = (raw: DashboardFetchDetailsResponse["data"]): DashboardApiPayload => {
  const cards: DashboardCard[] = [
    { label: "Total Jobs", value: raw.cards.totalJobs },
    { label: "Total Candidates", value: raw.cards.totalCandidates },
    { label: "AI Matches", value: raw.cards.totalAiMatches },
    { label: "Response Rate", value: `${raw.cards.responseRate}%` },
  ];

  const candidateGrowth: CandidateGrowthData = {
    labels: raw.candidateGrowth.map((item) => item.month),
    data: raw.candidateGrowth.map((item) => item.total),
  };

  const jobVsCandidate: JobVsCandidateData = {
    labels: ["Overview"],
    jobs: [raw.cards.totalJobs],
    candidates: [raw.cards.totalCandidates],
  };

  return { cards, candidateGrowth, jobVsCandidate, recentActivity: STATIC_RECENT_ACTIVITY };
};

const DashboardPage = () => {
  const { showLoader, hideLoader } = useLoader();
  const [dashboardData, setDashboardData] = useState<DashboardApiPayload | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    severity: "success" as "success" | "error" | "warning" | "info",
    message: "",
  });

  const closeNotification = () =>
    setNotification((prev) => ({ ...prev, open: false }));

  const fetchDashboardDetails = async () => {
    showLoader();
    try {
      const response: DashboardFetchDetailsResponse = await apiGet("/dashboard/fetchDetails");

      if (response?.status && response.data) {
        setDashboardData(mapDashboardResponse(response.data));
      } else {
        setNotification({
          open: true,
          severity: "warning",
          message: "No dashboard data available right now.",
        });
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setNotification({
        open: true,
        severity: "error",
        message: axiosError?.response?.data?.message ?? "Failed to load dashboard data.",
      });
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time fetch on mount; showLoader() runs before the await
    fetchDashboardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div suppressHydrationWarning>
      <DashboardCards cards={dashboardData?.cards ?? []} />

      <DashboardCharts
        candidateGrowth={dashboardData?.candidateGrowth ?? { labels: [], data: [] }}
        jobVsCandidate={dashboardData?.jobVsCandidate ?? { labels: [], jobs: [], candidates: [] }}
      />

      <DashboardRecentActivity activities={dashboardData?.recentActivity ?? []} />

      {notification.open && (
        <ApiResponseAlert
          severity={notification.severity}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default DashboardPage;
