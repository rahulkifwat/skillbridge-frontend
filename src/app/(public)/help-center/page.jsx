import Link from "next/link";
import {
  HiMagnifyingGlass,
  HiArrowRight,
  HiChevronRight,
  HiDocumentText,
  HiPlay,
  HiPlayCircle,
  HiCheckCircle,
  HiLifebuoy,
  HiChatBubbleLeftRight,
  HiEnvelope,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import DarkSection from "@/components/marketing/DarkSection";
import {
  supportChannels,
  topics,
  popularArticles,
  featuredTutorial,
  systemStatus,
  assurances,
} from "@/data/helpCenter";

export const metadata = {
  title: "Help Center — SkillBridge EdTech",
  description:
    "Find answers, get support, and make the most of your SkillBridge EdTech experience. Browse help topics, popular articles, video tutorials and system status.",
};

function ViewAll({ href, label }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
    >
      {label} <HiArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

// Hero: headline + readOnly search + support-agent photo placeholder, with the
// "Need More Help?" card floating over the right edge on large screens.
function Hero() {
  return (
    <DarkSection>
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Help Center
            </h1>
            <p className="mt-3 text-lg font-medium text-white/90 sm:text-xl">
              We&apos;re here to help you every step of the way.
            </p>
            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              Find answers, get support, and make the most of your{" "}
              <span className="text-brand-mint">SkillBridge EdTech</span>{" "}
              experience.
            </p>

            <div className="relative mt-7 max-w-xl">
              <HiMagnifyingGlass
                className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                readOnly
                aria-label="Search the help center"
                placeholder="How can we help you today?"
                className="w-full rounded-full border border-white/10 bg-white py-4 pl-14 pr-5 text-sm text-heading placeholder:text-muted focus:outline-none"
              />
            </div>
          </div>

          {/* No photo assets exist — support-agent image renders as a placeholder. */}
          <div className="lg:col-span-3">
            <div className="flex h-56 items-center justify-center rounded-2xl border border-ink-line bg-gradient-to-br from-ink-soft to-ink-line/40 sm:h-64">
              <span className="px-4 text-center text-xs text-white/40">
                Support agent photo
              </span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-ink-line bg-ink-soft/90 p-6 shadow-2xl shadow-black/40">
              <h2 className="text-lg font-bold">Need More Help?</h2>
              <p className="mt-1 text-sm text-white/70">
                Our support team is ready to assist you.
              </p>

              <ul className="mt-5 space-y-4">
                {supportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <li key={channel.title} className="flex items-start gap-3">
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-mint"
                        aria-hidden="true"
                      />
                      <span className="leading-tight">
                        <span className="block text-sm font-semibold text-white">
                          {channel.title}
                        </span>
                        <span className="block text-xs text-white/60">
                          {channel.detail}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Button
                href="/contact"
                variant="brand-outline"
                showArrow
                className="mt-6 w-full"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </DarkSection>
  );
}

function BrowseByTopic() {
  return (
    <section>
      <h2 className="text-xl font-bold text-heading sm:text-2xl">
        Browse by Topic
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.title}
              href={topic.href}
              className="flex flex-col rounded-xl border border-border bg-white p-5 text-center transition-shadow hover:shadow-md"
            >
              <Icon
                className={`mx-auto h-8 w-8 ${topic.accent}`}
                aria-hidden="true"
              />
              <h3 className="mt-4 text-sm font-bold text-heading">
                {topic.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-body">
                {topic.description}
              </p>
              <span className="mt-4 flex items-center justify-center gap-2 border-t border-border pt-4 text-xs font-medium text-brand">
                {topic.articles} Articles
                <HiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function PopularArticlesCard() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-2.5">
        <HiDocumentText className="h-5 w-5 text-brand" aria-hidden="true" />
        <h3 className="text-base font-bold text-heading">Popular Articles</h3>
      </div>

      <ul className="mt-4 flex-1 divide-y divide-border">
        {popularArticles.map((article) => (
          <li key={article.title}>
            <Link
              href={article.href}
              className="flex items-center gap-3 py-3 text-sm text-body hover:text-brand"
            >
              <HiDocumentText
                className="h-4 w-4 shrink-0 text-muted"
                aria-hidden="true"
              />
              <span className="flex-1">{article.title}</span>
              <HiChevronRight
                className="h-4 w-4 shrink-0 text-muted"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <ViewAll href="/help-center" label="View All Popular Articles" />
      </div>
    </div>
  );
}

function VideoTutorialsCard() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-2.5">
        <HiPlayCircle className="h-5 w-5 text-amber" aria-hidden="true" />
        <h3 className="text-base font-bold text-heading">Video Tutorials</h3>
      </div>
      <p className="mt-2 text-sm text-body">
        Watch step-by-step guides and tutorials.
      </p>

      {/* No video assets exist — thumbnail renders as a placeholder. */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-border bg-surface-alt">
        <div className="flex h-44 flex-col justify-between p-4">
          <p className="max-w-[60%] text-sm font-semibold text-heading">
            {featuredTutorial.title}
          </p>
          <span className="text-xs font-medium text-muted">
            {featuredTutorial.duration}
          </span>
        </div>
        <span
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
          aria-hidden="true"
        >
          <HiPlay className="h-5 w-5 text-heading" />
        </span>
      </div>

      <div className="mt-5">
        <ViewAll href="/help-center" label="View All Tutorials" />
      </div>
    </div>
  );
}

function SystemStatusCard() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-2.5">
        <HiCheckCircle className="h-5 w-5 text-emerald-500" aria-hidden="true" />
        <h3 className="text-base font-bold text-heading">System Status</h3>
      </div>
      <p className="mt-2 text-sm text-body">All systems are operational.</p>

      <ul className="mt-4 flex-1 space-y-3">
        {systemStatus.map((item) => (
          <li key={item.name} className="flex items-center gap-3 text-sm">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span className="flex-1 text-body">{item.name}</span>
            <span className="text-xs font-medium text-emerald-600">
              {item.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <ViewAll href="/help-center" label="View Status Page" />
      </div>
    </div>
  );
}

function StillNeedHelpCard() {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex items-center gap-2.5">
        <HiLifebuoy className="h-5 w-5 text-brand" aria-hidden="true" />
        <h3 className="text-base font-bold text-heading">Still Need Help?</h3>
      </div>
      <p className="mt-2 text-sm text-body">
        Can&apos;t find what you&apos;re looking for? Our support team is here
        for you.
      </p>

      <div className="mt-5 flex flex-1 flex-col justify-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          <HiChatBubbleLeftRight className="h-4 w-4" aria-hidden="true" />
          Start Live Chat
        </Link>

        <p className="text-center text-xs text-muted">or</p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand/30 bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
        >
          <HiEnvelope className="h-4 w-4" aria-hidden="true" />
          Submit a Support Ticket
        </Link>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        We typically respond within 24 hours.
      </p>
    </div>
  );
}

function Assurances() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-white p-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {assurances.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.title} className="flex items-start gap-3">
            <Icon
              className="mt-0.5 h-6 w-6 shrink-0 text-heading"
              aria-hidden="true"
            />
            <span className="leading-tight">
              <span className="block text-sm font-bold text-heading">
                {item.title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-body">
                {item.detail}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function HelpCenterPage() {
  return (
    <>
      <Hero />

      <section className="bg-surface py-12 lg:py-16">
        <Container className="space-y-10">
          <BrowseByTopic />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <PopularArticlesCard />
            <VideoTutorialsCard />
            <SystemStatusCard />
            <StillNeedHelpCard />
          </div>

          <Assurances />
        </Container>
      </section>
    </>
  );
}
