export interface Errors {
  "fullName":string,
  "email":string,
  "password":string,
  "mobile":string
}


export interface ApiResponseAlertProps {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
}


export interface DashboardCard {
  label: string;
  value: string | number;
}

export interface CandidateGrowthData {
  data: number[];
  labels: string[];
}

export interface JobVsCandidateData {
  jobs: number[];
  candidates: number[];
  labels: string[];
}

export type ActivityType =
  | "application"
  | "match"
  | "interview"
  | "job"
  | "report";

export interface RecentActivityItem {
  type: ActivityType;
  title: string;
  desc: string;
  time: string;
  status: string;
}

export interface DashboardApiPayload {
  candidateGrowth: CandidateGrowthData;
  cards: DashboardCard[];
  jobVsCandidate: JobVsCandidateData;
  recentActivity: RecentActivityItem[];
}
