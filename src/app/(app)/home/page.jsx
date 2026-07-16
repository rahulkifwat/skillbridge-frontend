import {
  HiArrowRight,
  HiFire,
  HiCalendarDays,
  HiStar,
  HiPaperAirplane,
  HiAcademicCap,
  HiBookmark,
  HiChevronRight,
  HiHandThumbUp,
  HiChatBubbleLeftRight,
  HiArrowTrendingUp,
  HiGlobeAlt,
} from "react-icons/hi2";
import PortalShell from "@/components/portal/PortalShell";
import WidgetCard from "@/components/portal/widgets/WidgetCard";
import DonutChart from "@/components/portal/widgets/DonutChart";
import ProgressBar from "@/components/portal/widgets/ProgressBar";
import Avatar from "@/components/common/Avatar";
import {
  learnerUser,
  homeNav,
  homeAdminNav,
  homeStats,
  learningProgress,
  schedule,
  homeProgress,
  homeSimulations,
  careerMatches,
  jobsProjects,
  communityPost,
  achievements,
  aiCoachActions,
  statusStyles,
} from "@/data/learnerDashboard";

function UpgradeWidget() {
  return (
    <div className="rounded-xl border border-border bg-primary-light p-4">
      <p className="text-sm font-semibold text-heading">Upgrade Your Career</p>
      <p className="mt-1 text-xs text-muted">Practice real-world skills and get matched with top opportunities.</p>
      <button type="button" className="mt-3 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white hover:bg-primary-hover">
        Explore Careers
      </button>
    </div>
  );
}

function SidebarUser() {
  const pct = Math.round((learnerUser.points / learnerUser.xpGoal) * 100);
  return (
    <div className="flex items-center gap-3">
      <Avatar name={learnerUser.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-heading">{learnerUser.name}</p>
        <p className="text-xs text-muted">{learnerUser.level} Level</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[10px] text-muted">{learnerUser.points.toLocaleString()} / {learnerUser.xpGoal.toLocaleString()} XP</span>
        </div>
        <ProgressBar percent={pct} className="mt-1" />
      </div>
      <HiChevronRight className="h-4 w-4 text-muted" />
    </div>
  );
}

export default function HomePage() {
  return (
    <PortalShell
      sidebar={{
        variant: "light",
        brandSub: "EdTech",
        nav: homeNav,
        sections: [{ label: "Admin", items: homeAdminNav }],
        widgets: <UpgradeWidget />,
        footer: <SidebarUser />,
      }}
      topbar={{
        user: { name: learnerUser.name, sub: "View Profile" },
        searchPlaceholder: "Search courses, skills, jobs...",
        showMessages: true,
        showHelp: false,
        notifications: 3,
      }}
    >
      {/* Hero banner */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl bg-gradient-to-br from-primary-light to-white p-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-heading">{learnerUser.greeting} 👋</h1>
          <p className="mt-1 text-sm text-body">Keep learning, keep growing.</p>
          <p className="text-sm text-body">Your future is built by what you do today.</p>
          <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
            Continue Learning
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="mb-2 text-center text-sm font-semibold text-heading">Your Progress</p>
          <div className="flex items-center justify-center">
            <DonutChart segments={[{ value: homeProgress.overall, color: "#2563eb" }]} size={110} thickness={12} gap={5}>
              <span className="text-xl font-bold text-heading">{homeProgress.overall}%</span>
              <span className="text-[10px] text-muted">Overall</span>
            </DonutChart>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="flex items-center gap-1.5 text-body"><HiFire className="h-4 w-4 text-red-500" /> Streak</span>
            <span className="font-semibold text-heading">{homeProgress.streak} days</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-body"><HiStar className="h-4 w-4 text-amber" /> Points</span>
            <span className="font-semibold text-heading">{homeProgress.points.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {homeStats.map((stat) => {
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
                  <p className="text-sm font-semibold text-heading">{c.title}</p>
                  <p className="line-clamp-1 text-xs text-muted">{c.description}</p>
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

      {/* Simulations + AI Coach */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Simulations" right={<span className="ml-2 text-xs text-muted">(85% of Training)</span>} action="View All">
          <p className="mb-4 text-sm text-body">Learn by doing. Practice real-world situations in a safe environment.</p>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <DonutChart segments={[{ value: homeSimulations.percent, color: "#2563eb" }]} size={130} thickness={14} gap={5}>
              <span className="text-xl font-bold text-heading">{homeSimulations.percent}%</span>
              <span className="text-[10px] text-muted">Completed</span>
            </DonutChart>
            <ul className="flex-1 space-y-2">
              {homeSimulations.items.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-body">{item.label}</span>
                  <span className={`shrink-0 font-medium ${statusStyles[item.status]}`}>{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-light px-4 py-2.5">
            <HiArrowTrendingUp className="h-5 w-5 text-primary" />
            <p className="text-xs text-body"><span className="font-semibold text-heading">Why Simulations?</span> You retain more, build confidence and get job-ready.</p>
          </div>
        </WidgetCard>

        <WidgetCard title="AI Coach">
          <p className="text-sm text-body">Ask anything about your career or learning.</p>
          <div className="mt-3 rounded-xl bg-surface p-4">
            <p className="text-sm font-semibold text-heading">Hi Maria! I'm your AI Coach.</p>
            <p className="text-sm text-body">How can I help you today?</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {aiCoachActions.map((a) => (
              <button key={a} type="button" className="rounded-lg border border-primary/30 px-3 py-2 text-xs font-medium text-primary hover:bg-primary-light">
                {a}
              </button>
            ))}
          </div>
          <div className="relative mt-4">
            <input readOnly placeholder="Type your question here..." className="w-full rounded-lg border border-border bg-white py-2.5 pl-4 pr-12 text-sm placeholder:text-muted focus:outline-none" />
            <button type="button" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-2 text-white">
              <HiPaperAirplane className="h-4 w-4" />
            </button>
          </div>
        </WidgetCard>
      </div>

      {/* Career matches + Jobs */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Top Career Matches" action="View All">
          <ul className="space-y-3">
            {careerMatches.map((m) => (
              <li key={m.title} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${m.color} text-sm font-bold text-white`}>
                  {m.title[0]}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-heading">{m.title}</p>
                  <p className="text-xs text-muted">{m.meta}</p>
                </div>
                <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-medium text-accent">{m.match}</span>
                <button type="button" className="rounded-lg border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary-light">View Job</button>
              </li>
            ))}
          </ul>
        </WidgetCard>

        <WidgetCard title="Jobs & Projects" action="View All">
          <ul className="space-y-3">
            {jobsProjects.map((j) => (
              <li key={j.title} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <HiBookmark className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-muted">{j.type}</p>
                  <p className="text-sm font-semibold text-heading">{j.title}</p>
                  <p className="text-xs text-muted">{j.meta}</p>
                </div>
                <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-600">{j.tag}</span>
              </li>
            ))}
          </ul>
          <button type="button" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Browse All Jobs & Projects <HiArrowRight className="h-3.5 w-3.5" />
          </button>
        </WidgetCard>
      </div>

      {/* Community + Achievements */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Community Activity" action="View All">
          <div className="flex items-start gap-3">
            <Avatar name={communityPost.name} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-heading">{communityPost.name}</p>
              <p className="text-xs text-muted">{communityPost.time}</p>
              <p className="mt-2 text-sm text-body">{communityPost.text}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1"><HiHandThumbUp className="h-4 w-4" /> {communityPost.likes}</span>
                <span className="flex items-center gap-1"><HiChatBubbleLeftRight className="h-4 w-4" /> {communityPost.comments}</span>
                <span className="text-primary">+{communityPost.others}</span>
              </div>
            </div>
          </div>
        </WidgetCard>

        <WidgetCard title="Your Achievements" action="View All">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {achievements.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="flex flex-col items-center gap-2 text-center">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${a.bg}`}>
                    <Icon className={`h-6 w-6 ${a.color}`} />
                  </span>
                  <p className="text-xs font-semibold text-heading">{a.title}</p>
                  <p className="text-[10px] text-muted">{a.detail}</p>
                </div>
              );
            })}
          </div>
        </WidgetCard>
      </div>

      {/* Dark banner */}
      <div className="mb-6 flex items-center gap-4 overflow-hidden rounded-2xl bg-navy p-6 text-white">
        <div className="flex-1">
          <p className="text-base font-semibold">Your future is created by what you do today, not tomorrow.</p>
          <p className="mt-1 text-sm text-white/70">Keep going, we're with you every step of the way.</p>
        </div>
        <HiCalendarDays className="hidden h-12 w-12 text-white/30 sm:block" />
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
