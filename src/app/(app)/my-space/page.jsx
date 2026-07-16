import {
  HiChevronRight,
  HiArrowRight,
  HiStar,
  HiChartBarSquare,
  HiPaperAirplane,
  HiAcademicCap,
  HiGlobeAlt,
} from "react-icons/hi2";
import PortalShell from "@/components/portal/PortalShell";
import WidgetCard from "@/components/portal/widgets/WidgetCard";
import RadarChart from "@/components/portal/widgets/RadarChart";
import ProgressBar from "@/components/portal/widgets/ProgressBar";
import StarRating from "@/components/common/StarRating";
import {
  learnerUser,
  mySpaceNav,
  mySpaceStats,
  learningProgress,
  schedule,
  skills,
  aiCoachActions,
  recommendations,
} from "@/data/learnerDashboard";

function ReferWidget() {
  return (
    <div className="rounded-xl border border-border bg-primary-light p-4 text-center">
      <div className="mb-2 flex justify-center gap-0.5 text-amber">
        <HiStar className="h-5 w-5" /><HiStar className="h-5 w-5" /><HiStar className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-heading">Refer a friend and earn rewards!</p>
      <button type="button" className="mt-3 w-full rounded-lg border border-primary/30 bg-white py-2 text-sm font-semibold text-primary hover:bg-primary-light">
        Invite Now
      </button>
    </div>
  );
}

function HelpWidget() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-semibold text-heading">Need help?</p>
      <p className="mt-1 text-xs text-muted">Visit our Help Center or contact support.</p>
      <button type="button" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        Go to Help Center
      </button>
    </div>
  );
}

export default function MySpacePage() {
  return (
    <PortalShell
      sidebar={{
        variant: "light",
        brandSub: "EdTech · Future Skills. Real Practice.",
        nav: mySpaceNav,
        widgets: (
          <>
            <ReferWidget />
            <HelpWidget />
          </>
        ),
      }}
      topbar={{
        user: { name: learnerUser.name, sub: "View Profile" },
        searchPlaceholder: "Search for courses, skills, jobs...",
        showMessages: true,
        showHelp: false,
        notifications: 3,
      }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-heading">{learnerUser.greeting} 👋</h1>
          <p className="mt-1 text-sm italic text-body">{learnerUser.quote}</p>
          <p className="text-xs text-muted">{learnerUser.quoteAuthor}</p>
        </div>
        <div className="flex items-center gap-6 rounded-2xl border border-border bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <HiChartBarSquare className="h-6 w-6 text-primary" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs text-muted">Your Level</span>
              <span className="text-sm font-bold text-heading">{learnerUser.level}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 border-l border-border pl-6">
            <HiStar className="h-6 w-6 text-amber" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs text-muted">Points</span>
              <span className="text-sm font-bold text-heading">{learnerUser.points.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mySpaceStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${stat.iconBg}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-body">{stat.label}</span>
                  <span className="text-2xl font-bold text-heading">{stat.value}</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">{stat.caption}</p>
              <button type="button" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                {stat.cta} <HiArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Learning progress + Schedule */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="My Learning Progress" action="View All">
          <ul className="space-y-4">
            {learningProgress.map((c, i) => (
              <li key={c.title} className="flex items-center gap-4">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${["bg-primary", "bg-accent", "bg-violet-500"][i]} text-white`}>
                  <HiAcademicCap className="h-7 w-7" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-heading">{c.title}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <ProgressBar percent={c.percent} color={c.color} />
                    <span className="shrink-0 text-xs font-medium text-muted">{c.percent}%</span>
                  </div>
                </div>
                <button type="button" className="shrink-0 rounded-lg border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light">
                  Continue
                </button>
              </li>
            ))}
          </ul>
        </WidgetCard>

        <WidgetCard title="Upcoming Schedule" action="View Calendar">
          <ul className="space-y-3">
            {schedule.map((s, i) => (
              <li key={i} className="flex items-center gap-4 rounded-xl bg-surface px-4 py-3">
                <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-light text-primary">
                  <span className="text-[10px] font-semibold uppercase">{s.month}</span>
                  <span className="text-lg font-bold leading-none">{s.day}</span>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-heading">{s.title}</p>
                  <p className="text-xs text-muted">{s.detail}</p>
                  <p className="text-xs text-muted">{s.time}</p>
                </div>
                <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-medium text-accent">{s.tag}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>
      </div>

      {/* Skills + AI Coach */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Skills Snapshot" action="View All">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <RadarChart data={skills} size={240} />
            <ul className="flex-1 space-y-2">
              {skills.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-body">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-semibold text-heading">{s.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </WidgetCard>

        <WidgetCard title="AI Coach">
          <p className="text-sm text-body">Ask anything about your career or learning.</p>
          <div className="mt-3 rounded-xl bg-surface p-4">
            <p className="text-sm font-semibold text-heading">Hi Maria! I'm your AI Coach.</p>
            <p className="text-sm text-body">What would you like to focus on today?</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {aiCoachActions.map((a) => (
              <button key={a} type="button" className="rounded-lg border border-primary/30 px-3 py-2 text-xs font-medium text-primary hover:bg-primary-light">
                {a}
              </button>
            ))}
          </div>
          <div className="relative mt-4">
            <input
              readOnly
              placeholder="Type your question here..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-4 pr-12 text-sm placeholder:text-muted focus:outline-none"
            />
            <button type="button" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-2 text-white">
              <HiPaperAirplane className="h-4 w-4" />
            </button>
          </div>
        </WidgetCard>
      </div>

      {/* Recommended */}
      <WidgetCard title="Recommended for You" action="View All" className="mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recommendations.map((r) => (
            <div key={r.title} className="flex flex-col gap-2 rounded-xl border border-border bg-white p-4">
              <span className={`inline-flex w-fit rounded-md px-2 py-0.5 text-[10px] font-bold ${r.tagColor}`}>{r.tag}</span>
              <p className="text-sm font-semibold text-heading">{r.title}</p>
              {r.rating && (
                <div className="flex items-center gap-1 text-xs text-muted">
                  <StarRating count={5} />
                  <span>{r.rating}</span>
                  <span>({r.reviews})</span>
                </div>
              )}
              {r.match && <p className="text-xs font-semibold text-accent">Match: {r.match}</p>}
              <p className="mt-auto text-xs text-muted">{r.meta}</p>
              {r.sub && <p className="text-xs text-muted">{r.sub}</p>}
            </div>
          ))}
        </div>
      </WidgetCard>

      {/* Motivational banner */}
      <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-primary-light p-6">
        <div>
          <p className="text-base font-semibold text-heading">
            “Your future is created by what you do today, not tomorrow.”
          </p>
          <p className="mt-1 text-sm text-muted">– Robert Kiyosaki</p>
        </div>
        <HiAcademicCap className="hidden h-12 w-12 text-primary/40 sm:block" />
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs text-muted">
        <p>© 2026 SkillBridge EdTech. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Help Center</span>
          <span className="flex items-center gap-1"><HiGlobeAlt className="h-4 w-4" /> English</span>
        </div>
      </footer>
    </PortalShell>
  );
}
