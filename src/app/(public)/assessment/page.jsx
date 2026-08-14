import Link from "next/link";
import { HiArrowRight, HiCheckCircle, HiClipboardDocumentCheck, HiSparkles } from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";

export const metadata = {
  title: "Start Your Assessment | SkillBridge",
  description: "Discover your current skills and receive a personalized SkillBridge learning roadmap.",
};

const OUTCOMES = [
  "English proficiency aligned to CEFR levels",
  "Career readiness and future-skills insights",
  "Recommended academies and simulations",
  "A personalized learning roadmap",
];

export default function AssessmentPage() {
  return (
    <DarkSection className="flex min-h-[calc(100vh-4rem)] items-center">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-mint"><HiSparkles className="h-4 w-4" />Personalized from the first step</span>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">Welcome to SkillBridge.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">Before you begin your learning journey, we’ll assess your current skills so we can create a personalized learning experience designed specifically for you.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover">Begin Assessment — $25 <HiArrowRight className="h-5 w-5" /></Link><Link href="/login" className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">I already have an account</Link></div>
          <p className="mt-4 text-xs text-white/50">Your results create a unique learning path—not just a score.</p>
        </div>
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <HiClipboardDocumentCheck className="h-9 w-9 text-brand-mint" />
          <h2 className="mt-5 text-2xl font-bold text-white">What you’ll receive</h2>
          <ul className="mt-6 space-y-4">{OUTCOMES.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/75"><HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-mint" />{item}</li>)}</ul>
          <div className="mt-7 rounded-xl border border-white/10 bg-ink-soft/70 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-brand-mint">Your journey</p><p className="mt-2 text-sm leading-relaxed text-white/75">Account → Goals → English diagnostic → Future skills → Results → Your roadmap</p></div>
        </aside>
      </Container>
    </DarkSection>
  );
}
