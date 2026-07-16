import Link from "next/link";
import {
  HiArrowRight,
  HiPlay,
  HiPlayCircle,
  HiPlus,
  HiSpeakerWave,
  HiCog6Tooth,
  HiArrowsPointingOut,
  HiSparkles,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import BrandLogo from "@/components/common/BrandLogo";
import StarRating from "@/components/common/StarRating";
import Avatar from "@/components/common/Avatar";
import DarkSection from "@/components/marketing/DarkSection";
import MarketingHeading from "@/components/marketing/MarketingHeading";
import {
  launchHero,
  launchStats,
  launchValues,
  launchAcademies,
  launchAcademyCta,
  launchEmployerBand,
} from "@/data/launch";

export const metadata = {
  title: "Launch Your Global Career — SkillBridge EdTech",
  description:
    "Master in-demand skills through real-world simulations, English training, and direct access to global remote career opportunities.",
};

// Subtle dotted "world map" texture behind the hero. Decorative only.
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-light via-white to-white" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(var(--color-brand-bright) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 75%)",
        }}
      />
    </div>
  );
}

function AvatarCluster({ names, size = "sm" }) {
  return (
    <div className="flex -space-x-2">
      {names.map((name, i) => (
        <Avatar key={name} name={name} size={size} index={i} />
      ))}
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-surface-alt text-muted ring-2 ring-white ${
          size === "sm" ? "h-8 w-8" : "h-12 w-12"
        }`}
        aria-hidden="true"
      >
        <HiPlus className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

function VideoCard() {
  const { video } = launchHero;
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink shadow-xl">
      {/* Placeholder stage — no video/photo assets exist. */}
      <div className="relative aspect-video bg-gradient-to-br from-ink-soft to-ink-line/40">
        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:p-8">
          <BrandLogo href={null} inverted />
          <div className="space-y-1 text-lg font-semibold leading-snug text-white sm:text-xl">
            {video.tagline.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <span className="absolute right-4 top-4 rounded-md border border-white/15 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/40">
          Video placeholder
        </span>
        {/* Lower-third caption */}
        <div className="absolute bottom-3 left-0 max-w-[70%] bg-ink/80 px-4 py-2 backdrop-blur-sm">
          <p className="text-sm font-semibold text-white">{video.speaker}</p>
          <p className="text-xs text-white/60">{video.role}</p>
          <p className="text-xs text-white/60">{video.org}</p>
        </div>
      </div>

      {/* Non-functional control bar */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 border-t border-ink-line bg-ink px-4 py-3 text-white/70"
      >
        <HiPlay className="h-4 w-4 shrink-0" />
        <span className="shrink-0 text-xs tabular-nums text-white/60">{video.time}</span>
        <span className="relative h-1 flex-1 rounded-full bg-white/15">
          <span className="absolute inset-y-0 left-0 w-[4%] rounded-full bg-brand-mint" />
          <span className="absolute -top-1 left-[4%] h-3 w-3 -translate-x-1/2 rounded-full bg-brand-mint" />
        </span>
        <HiSpeakerWave className="h-4 w-4 shrink-0" />
        <span className="shrink-0 rounded border border-white/30 px-1 text-[9px] font-bold leading-tight">CC</span>
        <HiCog6Tooth className="h-4 w-4 shrink-0" />
        <HiArrowsPointingOut className="h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}

export default function LaunchPage() {
  const { badge, headline, subcopy, avatars, socialProof, socialProofLead, video } = launchHero;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <Container className="relative grid gap-12 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              <HiSparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {badge}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-heading sm:text-5xl">
              {headline[0]}
              <br />
              <span className="text-brand">{headline[1]}</span>
              <br />
              <span className="text-3xl sm:text-4xl">{headline[2]}</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-body">{subcopy}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/career-assessment" variant="brand" showArrow>
                Get Assessed
              </Button>
              <Button href="/academies" variant="brand-light" showArrow>
                Start Learning
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft hover:border-ink-soft"
              >
                Hire Talent
                <HiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <AvatarCluster names={avatars} />
              <p className="text-sm text-body">
                <span className="font-semibold text-heading">{socialProofLead}</span> {socialProof}
              </p>
            </div>
          </div>

          <div>
            <VideoCard />
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-body">
              <HiPlayCircle className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              {video.caption}
            </p>
          </div>
        </Container>
      </section>

      {/* Stat card row */}
      <section className="bg-white pb-4">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-white p-6 shadow-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {launchStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4 px-2 py-4 lg:px-6 lg:py-1">
                  <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${stat.tint}`}>
                    <Icon className={`h-6 w-6 ${stat.text}`} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className={`text-2xl font-bold ${stat.text}`}>{stat.value}</span>
                    <span className="text-sm text-body">{stat.label}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Value row */}
      <section className="bg-white py-4">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-white p-6 shadow-sm sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {launchValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex items-start gap-4 px-2 py-4 lg:px-6 lg:py-1">
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${value.tint}`}>
                    <Icon className={`h-5 w-5 ${value.text}`} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-bold text-heading">{value.title}</span>
                    <span className="mt-1 text-sm leading-snug text-body">{value.description}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Academies */}
      <section className="bg-white py-12">
        <Container>
          <MarketingHeading
            title="Explore Our Academies"
            subtitle="Build the skills. Get the practice. Land the opportunity."
          />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {launchAcademies.map((academy) => {
              const Icon = academy.icon;
              return (
                <div
                  key={academy.name}
                  className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${academy.tint}`}>
                    <Icon className={`h-5 w-5 ${academy.text}`} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-heading">{academy.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-snug text-body">{academy.description}</p>
                  <Link
                    href={academy.href}
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${academy.text} hover:underline`}
                  >
                    Explore
                    <HiArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}

            <div className="flex flex-col rounded-2xl border border-brand/20 bg-brand-light p-5 shadow-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                <HiSparkles className="h-5 w-5 text-brand" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-heading">{launchAcademyCta.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-snug text-body">{launchAcademyCta.description}</p>
              <Button href={launchAcademyCta.action.href} variant="brand" className="mt-4 w-full">
                {launchAcademyCta.action.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Employer band */}
      <DarkSection glow={false}>
        <Container className="py-10">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-ink-line" aria-hidden="true" />
            <p className="text-center text-sm text-white/70">{launchEmployerBand.title}</p>
            <span className="h-px flex-1 bg-ink-line" aria-hidden="true" />
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {launchEmployerBand.logos.map((logo) => (
                <span key={logo.name} className={`text-white/80 ${logo.className}`}>
                  {logo.name}
                </span>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <StarRating count={5} />
              <span className="text-xs text-white/70">{launchEmployerBand.rating}</span>
              <AvatarCluster names={launchEmployerBand.avatars} />
            </div>
          </div>
        </Container>
      </DarkSection>
    </>
  );
}
