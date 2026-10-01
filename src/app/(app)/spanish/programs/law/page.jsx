import RequireAuth from "@/components/auth/RequireAuth";
import LawEnforcementUnitView from "@/components/spanish/LawEnforcementUnitView";

export const metadata = {
  title: "Law Enforcement Spanish · Level 1 Unit 1 | Spanish Academy",
  description:
    "Foundational field communication: traffic stops, identification, SFST language, custody language, documentation, and capstone simulation.",
};

export default function LawEnforcementUnitPage() {
  return (
    <RequireAuth fallbackPath="/spanish/programs/law">
      <LawEnforcementUnitView />
    </RequireAuth>
  );
}
