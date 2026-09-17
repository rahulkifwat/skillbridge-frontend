import RequireAuth from "@/components/auth/RequireAuth";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import SimulationMaster from "@/components/spanish/SimulationMaster";

export const metadata = {
  title: "Simulation Master | Spanish Academy",
  description: "Data-driven professional Spanish simulations with evaluation, mastery, and retry variations.",
};

export default function SpanishSimulationsPage() {
  return (
    <RequireAuth fallbackPath="/spanish/simulations">
      <SpanishAcademyShell eyebrow="Simulation Master">
        <SimulationMaster />
      </SpanishAcademyShell>
    </RequireAuth>
  );
}
