import DashboardCards from "@/app/components/dashboard/DashboardCards";
import DashboardCharts from "@/app/components/dashboard/DashboardCharts";
import DashboardRecentActivity from "@/app/components/dashboard/DashboardRecentActivity";

const page = () => {
  return (
    <>
      <DashboardCards />
      <DashboardCharts/>
      <DashboardRecentActivity />
    </>
  );
};

export default page;
