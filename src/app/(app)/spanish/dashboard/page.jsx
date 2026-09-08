import RequireAuth from "@/components/auth/RequireAuth";
import SpanishDashboard from "@/components/spanish/SpanishDashboard";

export const metadata = {
  title: "Spanish Academy Dashboard | SkillBridge",
  description: "Personalized Spanish learning path from your diagnostic profile.",
};

export default function SpanishDashboardPage() {
  return (
    <RequireAuth fallbackPath="/spanish/dashboard">
      <SpanishDashboard />
    </RequireAuth>
  );
}
