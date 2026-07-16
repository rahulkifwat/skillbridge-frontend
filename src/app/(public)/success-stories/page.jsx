import Link from "next/link";
import {
  HiArrowRight,
  HiChevronDown,
  HiMagnifyingGlass,
  HiPlay,
  HiStar,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Avatar from "@/components/common/Avatar";
import StarRating from "@/components/common/StarRating";
import DarkSection from "@/components/marketing/DarkSection";
import CtaBanner from "@/components/marketing/CtaBanner";
import {
  heroStats,
  trustpilot,
  storyFilters,
  academyStyles,
  stories,
  videoPromo,
  reviewSummary,
  employerLogos,
} from "@/data/successStories";

export const metadata = {
  title: "Success Stories — SkillBridge EdTech",
  description:
    "Real people, real results, real global careers. Meet the students from Latin America, Africa and Asia who built better futures through SkillBridge.",
};

// No photo assets exist in this project — group/video imagery is rendered as a
// bordered gradient placeholder box with a muted label.
function ImagePlaceholder({ label, className = "", children }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-ink-line bg-gradient-to-br from-ink-soft via-ink to-ink-soft ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.18),transparent_60%)]"
      />
      <span className="relative text-xs font-medium text-white/40">{label}</span>
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <DarkSection>
      <Container className="py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              <span className="block">Real People.</span>
              <span className="block">Real Results.</span>
              <span className="block text-brand-mint">Real Global Careers.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70">
              Our students from Latin America, Africa and Asia are building better
              futures through global opportunities.
            </p>

            <div className="mt-8 rounded-xl border border-ink-line bg-white/5 p-5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:divide-x sm:divide-ink-line">
                {heroStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className={`flex items-start gap-3 ${i > 0 ? "sm:pl-5" : ""}`}
                    >
                      <Icon
                        className="mt-0.5 h-6 w-6 shrink-0 text-brand-bright"
                        aria-hidden="true"
                      />
                      <span className="flex flex-col leading-tight">
                        <span className="text-lg font-bold text-white">
                          {stat.value}
                        </span>
                        <span className="mt-1 text-xs text-white/60">
                          {stat.label}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <HiStar className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                Trustpilot
              </span>
              <span
                className="flex items-center gap-0.5"
                aria-label={`${trustpilot.stars} out of 5 stars`}
              >
                {Array.from({ length: trustpilot.stars }).map((_, i) => (
                  <span
                    key={i}
                    className="flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-500"
                  >
                    <HiStar className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </span>
                ))}
              </span>
              <span className="text-sm text-white/70">{trustpilot.summary}</span>
            </div>
          </div>

          <ImagePlaceholder
            label="Students photo"
            className="aspect-[4/3] w-full lg:aspect-[5/4]"
          />
        </div>
      </Container>
    </DarkSection>
  );
}

function FilterBar() {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="text-xl font-bold text-heading sm:text-2xl">
        Student Success Stories
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {storyFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-3 py-2 text-sm text-body"
          >
            <span>{filter}</span>
            <HiChevronDown className="h-4 w-4 text-muted" aria-hidden="true" />
          </div>
        ))}

        <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
          <input
            type="text"
            readOnly
            placeholder="Search stories..."
            aria-label="Search stories"
            className="w-full min-w-0 bg-transparent text-sm text-body outline-none placeholder:text-muted sm:w-52"
          />
          <HiMagnifyingGlass className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, index }) {
  const style = academyStyles[story.academy];
  const AcademyIcon = style?.icon;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <Avatar name={story.name} index={index} className="h-14 w-14 text-base" />
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style?.pill ?? "bg-surface-alt text-body"}`}
        >
          {AcademyIcon && <AcademyIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {story.academy}
        </span>
      </div>

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      <div className="mt-4">
        <p className="text-sm font-bold text-heading">{story.name}</p>
        <p className="text-xs text-muted">{story.role}</p>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <span className={`text-base font-bold ${story.employerClass}`}>
          {story.employer}
        </span>
        <span className="whitespace-nowrap text-base font-bold text-brand">
          {story.salary}
          <span className="text-xs font-medium"> /year</span>
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-surface px-3 py-2 text-xs text-muted">
        <span>{story.hired}</span>
        <span className="flex items-center gap-1.5 font-medium text-body">
          <span aria-hidden="true">{story.flag}</span>
          {story.country}
        </span>
      </div>
    </article>
  );
}

function VideoPromoCard() {
  return (
    <DarkSection className="rounded-xl" glow={false}>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{videoPromo.title}</h3>
        <p className="mt-1 text-sm text-white/70">{videoPromo.subtitle}</p>

        <ImagePlaceholder
          label="Success story video"
          className="mt-4 aspect-video w-full border-white/10"
        >
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-bright shadow-lg">
              <HiPlay className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
          </span>
        </ImagePlaceholder>

        <Link
          href={videoPromo.href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-mint hover:underline"
        >
          {videoPromo.linkLabel} <HiArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </DarkSection>
  );
}

function ReviewSummaryCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-bold text-heading">{reviewSummary.title}</h3>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="text-3xl font-bold text-heading">{reviewSummary.score}</span>
        <StarRating count={reviewSummary.stars} />
        <span className="text-xs text-muted">{reviewSummary.reviewCount}</span>
      </div>

      <blockquote className="mt-4 text-sm leading-relaxed text-body">
        &ldquo;{reviewSummary.quote}&rdquo;
      </blockquote>
      <p className="mt-3 text-xs text-muted">{reviewSummary.attribution}</p>
    </div>
  );
}

function EmployerLogoRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-xl border border-border bg-white px-5 py-6 lg:justify-between">
      <p className="text-sm font-bold text-heading">
        Our Students Work For Top Global Companies
      </p>
      {employerLogos.map((logo) => (
        <span key={logo.name} className={`text-base font-bold ${logo.className}`}>
          {logo.name}
        </span>
      ))}
      <span className="text-sm text-muted">And many more...</span>
    </div>
  );
}

export default function SuccessStoriesPage() {
  return (
    <>
      <HeroSection />

      <Container className="py-10 lg:py-14">
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <FilterBar />

          <div className="mt-6 grid gap-6 xl:grid-cols-[3fr_1fr]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stories.map((story, i) => (
                <StoryCard key={story.name} story={story} index={i} />
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <VideoPromoCard />
              <ReviewSummaryCard />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <EmployerLogoRow />
        </div>

        <div className="mt-8">
          <CtaBanner
            title="Your success story could be next."
            subtitle="Join thousands of students building global careers with SkillBridge."
            primary={{
              label: "Take the Career Assessment",
              href: "/career-assessment",
            }}
            secondary={{ label: "Explore Academies", href: "/academies" }}
          />
        </div>
      </Container>
    </>
  );
}
