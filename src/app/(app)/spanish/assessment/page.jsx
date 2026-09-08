import RequireAuth from "@/components/auth/RequireAuth";
import SpanishDiagnosticFlow from "@/components/spanish/SpanishDiagnosticFlow";

export const metadata = {
  title: "Spanish Academy Diagnostic | SkillBridge",
  description: "Six-skill Spanish diagnostic with CEFR placement. Separate from English and career assessments.",
};

export default function SpanishAssessmentPage() {
  return (
    <RequireAuth fallbackPath="/spanish/assessment">
      <SpanishDiagnosticFlow />
    </RequireAuth>
  );
}
