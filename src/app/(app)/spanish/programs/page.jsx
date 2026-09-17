import RequireAuth from "@/components/auth/RequireAuth";
import SpanishProgramsView from "./SpanishProgramsView";

export const metadata = {
  title: "Spanish Academy Programs | SkillBridge",
  description: "Master program catalog for the SkillBridge Spanish Academy.",
};

export default function SpanishProgramsPage() {
  return (
    <RequireAuth fallbackPath="/spanish/programs">
      <SpanishProgramsView />
    </RequireAuth>
  );
}
