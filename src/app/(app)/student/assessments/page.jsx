import RequireAuth from "@/components/auth/RequireAuth";
import SpanishAcademyFlow from "@/components/spanish/SpanishAcademyFlow";

export const metadata = {
  title: "Spanish Academy Assessment | SkillBridge Student Portal",
  description:
    "Discover your current Spanish level and receive a personalized SkillBridge Spanish Academy learning path.",
};

export default function StudentAssessmentsPage() {
  return (
    <RequireAuth>
      <SpanishAcademyFlow />
    </RequireAuth>
  );
}
