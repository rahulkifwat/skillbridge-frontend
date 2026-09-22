import RequireAuth from "@/components/auth/RequireAuth";
import SpanishAcademyShell from "@/components/spanish/SpanishAcademyShell";
import VideoMaster from "@/components/spanish/VideoMaster";

export const metadata = {
  title: "Video Master | Spanish Academy",
  description: "Watch the 2–3 minute Spanish micro-lesson. Completing it unlocks Simulation Master.",
};

export default function SpanishVideosPage() {
  return (
    <RequireAuth fallbackPath="/spanish/videos">
      <SpanishAcademyShell eyebrow="Video Master">
        <VideoMaster />
      </SpanishAcademyShell>
    </RequireAuth>
  );
}
