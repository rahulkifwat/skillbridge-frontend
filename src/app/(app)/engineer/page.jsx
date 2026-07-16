import {
  HiPlus,
  HiChevronDown,
  HiSignal,
  HiArrowTopRightOnSquare,
  HiWrenchScrewdriver,
  HiSun,
  HiChevronRight,
  HiArrowTrendingUp,
  HiLightBulb,
} from "react-icons/hi2";
import PortalShell from "@/components/portal/PortalShell";
import WidgetCard from "@/components/portal/widgets/WidgetCard";
import DonutChart from "@/components/portal/widgets/DonutChart";
import Sparkline from "@/components/portal/widgets/Sparkline";
import Avatar from "@/components/common/Avatar";
import {
  engineerUser,
  engineerNav,
  engineerStats,
  sprint,
  activeTasks,
  priorityStyles,
  pipelines,
  pipelineStatusStyles,
  systemHealth,
  activityFeed,
  engineeringMetrics,
  docIcon,
} from "@/data/engineerDashboard";

const DocIcon = docIcon;

function PlatformStatusWidget() {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">Platform Status</p>
      <p className="flex items-center gap-2 text-sm font-medium text-white">
        <span className="h-2 w-2 rounded-full bg-accent" />
        All Systems Operational
      </p>
      <button type="button" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
        View Status Page <HiArrowTopRightOnSquare className="h-3 w-3" />
      </button>
    </div>
  );
}

function ToolkitWidget() {
  return (
    <div className="rounded-xl bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Engineer Toolkit</p>
        <HiWrenchScrewdriver className="h-5 w-5 text-primary" />
      </div>
      <p className="text-xs text-white/60">Boost productivity with our tools and integrations.</p>
      <button type="button" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
        Explore Tools <HiChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}

export default function EngineerDashboardPage() {
  return (
    <PortalShell
      sidebar={{
        variant: "dark",
        brandSub: "Build Skills. Bridge Futures.",
        brandLabel: "Engineer Portal",
        nav: engineerNav,
        widgets: (
          <>
            <PlatformStatusWidget />
            <ToolkitWidget />
          </>
        ),
        footer: (
          <button type="button" className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-white/70 hover:bg-white/5">
            <span className="flex items-center gap-2">
              <HiSun className="h-5 w-5" /> Light Mode
            </span>
            <HiChevronRight className="h-4 w-4" />
          </button>
        ),
      }}
      topbar={{ user: { name: engineerUser.name, sub: engineerUser.role }, notifications: 6 }}
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-heading">{engineerUser.greeting} 👋</h1>
          <p className="mt-1 text-sm text-body">{engineerUser.subtitle}</p>
        </div>
        <div className="flex items-stretch">
          <button type="button" className="inline-flex items-center gap-2 rounded-l-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover">
            <HiPlus className="h-4 w-4" /> New Task
          </button>
          <button type="button" className="rounded-r-lg border-l border-white/20 bg-primary px-2 text-white hover:bg-primary-hover">
            <HiChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {engineerStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-body">{stat.label}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </span>
                <span className="text-3xl font-bold text-heading">{stat.value}</span>
              </div>
              <p className={`mt-3 text-xs ${stat.captionColor || "text-muted"}`}>{stat.caption}</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                <div className={`h-full rounded-full ${stat.bar}`} style={{ width: stat.barWidth }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sprint + Active tasks */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard
          title="Sprint Progress"
          right={
            <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-body">
              {sprint.label} <HiChevronDown className="h-3 w-3" />
            </span>
          }
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <DonutChart
              segments={[{ value: sprint.percent, color: "#2563eb" }]}
              size={150}
              thickness={16}
              gap={6}
            >
              <span className="text-2xl font-bold text-heading">{sprint.percent}%</span>
              <span className="text-xs text-muted">Completed</span>
            </DonutChart>
            <div className="flex-1">
              <p className="text-2xl font-bold text-heading">
                {sprint.percent}% <span className="text-base font-medium text-body">completed</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                {sprint.storyPoints.done} of {sprint.storyPoints.total} story points
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-alt">
                <div className="h-full rounded-full bg-primary" style={{ width: `${sprint.percent}%` }} />
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-4">
            {sprint.breakdown.map((b) => (
              <div key={b.label}>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className={`h-2 w-2 rounded-full ${b.color}`} /> {b.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-heading">{b.value}</p>
              </div>
            ))}
          </div>
        </WidgetCard>

        <WidgetCard title="My Active Tasks" action="View All">
          <ul className="divide-y divide-border">
            {activeTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 py-3">
                <DocIcon className="h-5 w-5 shrink-0 text-muted" />
                <p className="flex-1 text-sm text-heading">
                  <span className="font-semibold text-primary">{task.id}</span> {task.title}
                </p>
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`w-20 shrink-0 text-right text-xs font-medium ${task.dueColor || "text-muted"}`}>
                  {task.due}
                </span>
              </li>
            ))}
          </ul>
        </WidgetCard>
      </div>

      {/* Pipeline + System health */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Pipeline Status" action="View All">
          <ul className="space-y-2">
            {pipelines.map((p) => (
              <li key={p.branch} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
                <HiSignal className="h-5 w-5 shrink-0 rotate-90 text-muted" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-heading">{p.name}</span>
                  <span className="block text-xs text-muted">{p.branch}</span>
                </span>
                <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${pipelineStatusStyles[p.status]}`}>
                  {p.status}
                </span>
                <span className="w-16 shrink-0 text-right text-xs text-muted">{p.time}</span>
              </li>
            ))}
          </ul>
        </WidgetCard>

        <WidgetCard title="System Health" action="View All">
          <ul className="divide-y divide-border">
            {systemHealth.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.name} className="flex items-center gap-3 py-3">
                  <Icon className={`h-5 w-5 shrink-0 ${s.color}`} />
                  <span className="flex-1 text-sm font-medium text-heading">{s.name}</span>
                  <span className="text-sm font-semibold text-heading">{s.uptime}</span>
                  <Sparkline data={s.spark} stroke={s.stroke} width={90} height={28} />
                </li>
              );
            })}
          </ul>
        </WidgetCard>
      </div>

      {/* Activity + Metrics */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WidgetCard title="Activity Feed" action="View All">
          <ul className="space-y-4">
            {activityFeed.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex items-start gap-3">
                  {a.type === "avatar" ? (
                    <Avatar name={a.name} size="sm" index={i} />
                  ) : (
                    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${a.iconBg}`}>
                      <Icon className={`h-5 w-5 ${a.iconColor}`} />
                    </span>
                  )}
                  <p className="flex-1 text-sm text-body">
                    {a.name && <span className="font-semibold text-heading">{a.name} </span>}
                    {a.text}
                  </p>
                  <span className="shrink-0 text-xs text-muted">{a.time}</span>
                </li>
              );
            })}
          </ul>
        </WidgetCard>

        <WidgetCard
          title="Engineering Metrics"
          right={
            <span className="ml-auto inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-body">
              This Week <HiChevronDown className="h-3 w-3" />
            </span>
          }
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {engineeringMetrics.map((m) => (
              <div key={m.label}>
                <p className="text-xs text-muted">{m.label}</p>
                <p className="mt-1 text-2xl font-bold text-heading">{m.value}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  <HiArrowTrendingUp className="h-3 w-3" /> {m.delta}
                </p>
                <div className="mt-2">
                  <Sparkline data={m.spark} stroke={m.stroke} width={160} height={48} fill />
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>

      {/* Tip banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-primary-light p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <HiLightBulb className="h-6 w-6 text-amber" />
          </span>
          <p className="text-sm text-body">
            <span className="font-semibold text-heading">💡 Engineer Tip</span>{" "}
            Use keyboard shortcuts to boost your productivity. Press{" "}
            <kbd className="rounded border border-border bg-white px-1.5 text-xs">?</kbd> to view all shortcuts.
          </p>
        </div>
        <button type="button" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
          View Shortcuts
        </button>
      </div>
    </PortalShell>
  );
}
