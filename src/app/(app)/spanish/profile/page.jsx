import RequireAuth from "@/components/auth/RequireAuth";
import SpanishProfileView from "./SpanishProfileView";

export const metadata = {
  title: "Your Spanish Profile | SkillBridge",
};

export default function SpanishProfilePage() {
  return (
    <RequireAuth fallbackPath="/spanish/profile">
      <SpanishProfileView />
    </RequireAuth>
  );
}
