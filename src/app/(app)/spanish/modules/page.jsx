import RequireAuth from "@/components/auth/RequireAuth";
import BlueprintModuleList from "@/components/spanish/BlueprintModuleList";

export const metadata = {
  title: "Production modules | Spanish Academy",
  description:
    "Law Enforcement Spanish Level 1 modules built on the 15% video / 85% interactive simulation architecture.",
};

export default function BlueprintModulesPage() {
  return (
    <RequireAuth fallbackPath="/spanish/modules">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <BlueprintModuleList />
      </div>
    </RequireAuth>
  );
}
