import Image from "next/image";
import Link from "next/link";
import {
  HiAcademicCap,
  HiArrowRight,
  HiBriefcase,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiClipboardDocumentCheck,
  HiCpuChip,
  HiGlobeAlt,
  HiRocketLaunch,
  HiViewfinderCircle,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import CtaBanner from "@/components/marketing/CtaBanner";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import { academies, topCareers } from "@/data/marketing";

export const metadata = {
  title: "SkillBridge EdTech | Your Bridge to Global Careers",
  description: "Build global career readiness through English, technology, AI, and real-world practice.",
};

const BENEFITS = [
  { icon: HiClipboardDocumentCheck, title: "Personalized start", text: "Begin with a career assessment and a learning direction shaped around your goals." },
  { icon: HiAcademicCap, title: "Nine focused academies", text: "Build English, technology, AI, and career skills in one connected platform." },
  { icon: HiViewfinderCircle, title: "Practice for real work", text: "Use simulations to build confidence in workplace communication and remote collaboration." },
  { icon: HiCpuChip, title: "AI-supported learning", text: "Get study guidance, feedback, and practice support as you move forward." },
];

const ROADMAP = [
  { year: "2026", milestones: "Platform launch · First student cohort · Career Assessment launch" },
  { year: "2027", milestones: "Student enrollment growth · Employer partnerships · Expanded career pathways" },
  { year: "2028", milestones: "Expansion across Latin America · Additional language options · Broader employer network" },
  { year: "2029", milestones: "Global employer network · International opportunities · Continued innovation with AI" },
];

function SectionLabel({ children }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand">{children}</p>;
}

export default function HomePage() {
  return (
    <>
      <DarkSection className="overflow-hidden">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[0.94fr_1.06fr] lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-brand-mint">Real skills. Real practice. Real results.</span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl">Your Bridge to Global Careers <span className="text-brand-mint">Starts Here.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Launch your global career through English, technology, AI, and real-world practice. SkillBridge prepares you with the skills, mindset, and experience needed to compete in the global workforce.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/assessment" className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-hover">Start Your Career Assessment — $25 <HiArrowRight className="h-4 w-4" /></Link>
              <Link href="/academies" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Explore Our Academies</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -inset-8 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.5rem] border-[7px] border-ink-line bg-ink-soft shadow-2xl shadow-black/30">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber" /><span className="h-2 w-2 rounded-full bg-accent" /><span className="ml-3 text-[10px] font-medium text-white/45">SkillBridge Student Platform</span></div>
              <Image src="/112.jpg" alt="SkillBridge student dashboard shown on a laptop" width={1440} height={900} priority className="h-auto w-full" />
            </div>
            <div className="absolute -bottom-8 -right-2 hidden w-40 overflow-hidden rounded-[1.4rem] border-[5px] border-ink-line bg-ink-soft shadow-2xl sm:block lg:-right-8"><div className="h-5 bg-ink-line" /><Image src="/112.jpg" alt="SkillBridge mobile learning view" width={320} height={600} className="h-56 w-full object-cover object-left-top" /></div>
          </div>
        </Container>
      </DarkSection>

      <section className="bg-white py-16"><Container><MarketingHeading title="A platform built for the journey ahead" subtitle="From your first assessment to focused practice, SkillBridge brings the essential parts of career preparation together." className="mb-9" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{BENEFITS.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-border bg-surface p-5"><Icon className="h-7 w-7 text-brand" /><h2 className="mt-5 text-base font-bold text-heading">{title}</h2><p className="mt-2 text-sm leading-relaxed text-body">{text}</p></article>)}</div></Container></section>

      <section className="bg-surface py-16"><Container><MarketingHeading title="Our 9 Academies" subtitle="A connected learning ecosystem for global career readiness." className="mb-9" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{academies.map((academy) => { const Icon = academy.icon; return <article key={academy.name} className="group flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"><span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${academy.tint}`}><Icon className={`h-5 w-5 ${academy.text}`} /></span><div><h2 className="font-bold text-heading">{academy.name}</h2><p className="mt-1 text-sm text-body">{academy.short}</p><Link href="/academies" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">Explore <HiArrowRight className="h-4 w-4" /></Link></div></article>; })}</div></Container></section>

      <section className="bg-white py-16"><Container><MarketingHeading title="10 High-Demand Career Pathways" subtitle="Explore focused pathways that develop practical, career-ready capability." className="mb-9" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{topCareers.map((career) => { const Icon = career.icon; const title = career.title === "AI Specialist / Prompt Engineer" ? "AI Support Specialist" : career.title; return <Link href="/career-paths" key={career.n} className="group rounded-xl border border-border bg-white p-4 transition hover:border-brand hover:shadow-sm"><span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${career.tint}`}><Icon className={`h-5 w-5 ${career.text}`} /></span><p className="mt-4 text-sm font-bold text-heading">{title}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">Explore pathway <HiArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div></Container></section>

      <section className="bg-brand-light py-16"><Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><SectionLabel>Founding cohort</SectionLabel><h2 className="text-3xl font-bold tracking-tight text-heading">Be Part of Our Founding Cohort.</h2><p className="mt-4 max-w-xl text-base leading-relaxed text-body">SkillBridge is preparing its first generation of students. Become one of our founding learners and help shape a new model of global workforce education.</p><Link href="/assessment" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-hover">Start Assessment — $25 <HiArrowRight className="h-4 w-4" /></Link></div><div className="rounded-2xl border border-brand/20 bg-white p-6"><HiRocketLaunch className="h-8 w-8 text-brand" /><h3 className="mt-5 text-xl font-bold text-heading">A learning path with room to grow</h3><p className="mt-2 text-sm leading-relaxed text-body">Start by understanding your current skills, then move through targeted learning, practice, and progress milestones at a pace that works for you.</p><div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand"><HiChatBubbleLeftRight className="h-5 w-5" />English, technology, AI, and career preparation</div></div></Container></section>

      <section className="bg-ink py-16"><Container className="grid items-center gap-8 lg:grid-cols-2"><div><SectionLabel>Employer partnerships</SectionLabel><h2 className="text-3xl font-bold tracking-tight text-white">Building the bridge to future opportunities.</h2><p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">SkillBridge is developing relationships with employers to create future opportunities for qualified graduates. As our employer network grows, graduates will gain access to new career opportunities.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Talk with our team <HiBriefcase className="h-5 w-5" /></Link></div><div className="grid gap-3 sm:grid-cols-2">{["Candidate readiness", "Competency evidence", "Simulation practice", "Future opportunities"].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-white"><HiCheckCircle className="h-5 w-5 text-brand-mint" />{item}</div>)}</div></Container></section>

      <section className="bg-white py-16"><Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><SectionLabel>Our mission</SectionLabel><h2 className="text-3xl font-bold tracking-tight text-heading">Make global career preparation more practical, accessible, and human.</h2><p className="mt-4 text-base leading-relaxed text-body">SkillBridge connects learning to real-world practice so people can build the confidence and capability to participate in a changing global workforce.</p><div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand"><HiGlobeAlt className="h-5 w-5" />Designed for learners preparing for a global future.</div></div><div id="roadmap"><SectionLabel>Planned roadmap</SectionLabel><ol className="border-l border-brand/30 pl-6">{ROADMAP.map((entry) => <li key={entry.year} className="relative pb-7 last:pb-0"><span className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full border-2 border-brand bg-white" /><p className="text-sm font-bold text-brand">{entry.year}</p><p className="mt-1 text-sm leading-relaxed text-body">{entry.milestones}</p></li>)}</ol></div></Container></section>

      <section className="bg-surface pb-16"><Container><CtaBanner title="Your global career journey can start here." subtitle="Take the $25 Career Assessment and receive the first direction for your SkillBridge learning path." primary={{ label: "Start Your Career Assessment — $25", href: "/assessment" }} secondary={{ label: "Explore Our Academies", href: "/academies" }} /></Container></section>
    </>
  );
}
