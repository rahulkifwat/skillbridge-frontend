import RequireAuth from "@/components/auth/RequireAuth";
import BlueprintModule from "@/components/spanish/BlueprintModule";

export const metadata = {
  title: "Production module | Spanish Academy",
  description:
    "15% video observation, 85% interactive simulation. Production Master Blueprint SBS-2026-PRODUCTION-002.",
};

export default async function BlueprintModulePage({ params }) {
  const { lessonId } = await params;
  return (
    <RequireAuth fallbackPath={`/spanish/modules/${lessonId}`}>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <BlueprintModule lessonId={lessonId} />
      </div>
    </RequireAuth>
  );
}
