"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiAcademicCap,
  HiBriefcase,
  HiBuildingOffice2,
  HiChartBarSquare,
  HiCog6Tooth,
  HiDocumentText,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";
import { dashboardApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import PortalSidebar from "./PortalSidebar";
import StudentTopbar from "./StudentTopbar";

const LANDING_BY_ROLE = {
  student: "/student",
  instructor: "/instructor",
  employer: "/employer",
  administrator: "/admin",
  partner: "/partner",
  super_admin: "/super-admin",
};

const CONFIG = {
  instructor: {
    label: "Instructor",
    icon: HiAcademicCap,
    nav: ["Overview", "Courses", "Curriculum", "Videos", "Simulations", "Quizzes", "Assignments", "Student analytics", "Content approvals"],
    actions: ["Create course", "Create assessment", "Review submissions"],
  },
  employer: {
    label: "Employer",
    icon: HiBuildingOffice2,
    nav: ["Overview", "Job postings", "Candidate search", "Talent pipeline", "Saved candidates", "Interviews", "Company analytics", "Messages"],
    actions: ["Post a job", "Search candidates", "Schedule interview"],
  },
  administrator: {
    label: "Administrator",
    icon: HiCog6Tooth,
    nav: ["Overview", "Users", "Academies", "Payments", "Subscriptions", "Reports", "Support tickets", "Content moderation", "Security"],
    actions: ["Manage users", "View reports", "Review tickets"],
  },
  partner: {
    label: "Partner",
    icon: HiUserGroup,
    nav: ["Overview", "Sponsored learners", "Enrollments", "Cohorts", "Scholarships", "Progress reports", "Impact metrics", "Regional analytics"],
    actions: ["View cohorts", "Create scholarship", "Export report"],
  },
  super_admin: {
    label: "Super Administrator",
    icon: HiShieldCheck,
    nav: ["Overview", "Global configuration", "AI models", "Security policies", "Audit logs", "Integrations", "Backups", "Performance", "Roles & permissions"],
    actions: ["Configure platform", "Review audit logs", "Manage roles"],
  },
};

const METRIC_ICONS = [HiChartBarSquare, HiBriefcase, HiDocumentText];

export default function RoleDashboard({ role }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [overview, setOverview] = useState(null);
  const [apiError, setApiError] = useState("");
  const config = CONFIG[role];

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(LANDING_BY_ROLE[role])}`);
      return;
    }
    if (user.role !== role) {
      router.replace(LANDING_BY_ROLE[user.role] || "/student");
      return;
    }

    dashboardApi.overview().then((result) => setOverview(result.data.overview)).catch((error) => {
      setApiError(error.message || "Could not load dashboard data.");
    });
  }, [loading, role, router, user]);

  const Icon = config.icon;
  const nav = config.nav.map((label, index) => ({
    label,
    icon: index === 0 ? Icon : index % 2 ? HiDocumentText : HiChartBarSquare,
    active: index === 0,
  }));

  if (loading || !user || user.role !== role) {
    return <div className="min-h-screen bg-surface" aria-busy="true" />;
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <PortalSidebar variant="dark" brandSub={config.label} nav={nav} />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudentTopbar searchPlaceholder={`Search ${config.label.toLowerCase()} tools...`} notifications={role === "super_admin" ? 1 : 3} />
        <main className="flex-1 px-4 py-7 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><Icon className="h-5 w-5" />{config.label}</p>
                <h1 className="text-3xl font-bold tracking-tight text-heading">{overview?.title || `${config.label} Dashboard`}</h1>
                <p className="mt-2 max-w-2xl text-sm text-body">{overview?.description || "Loading your workspace..."}</p>
              </div>
              <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover">{config.actions[0]}</button>
            </div>

            {apiError ? <p role="alert" className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{apiError}</p> : null}

            <section className="grid gap-4 md:grid-cols-3">
              {(overview?.metrics || []).map(({ label, value }, index) => {
                const MetricIcon = METRIC_ICONS[index];
                return <article key={label} className="rounded-2xl border border-border bg-white p-5 shadow-sm"><MetricIcon className="mb-4 h-6 w-6 text-primary" /><p className="text-3xl font-bold text-heading">{value}</p><p className="mt-1 text-sm text-muted">{label}</p></article>;
              })}
            </section>

            <section className="mt-7 grid gap-6 lg:grid-cols-3">
              <article className="rounded-2xl border border-border bg-white p-6 shadow-sm lg:col-span-2"><h2 className="text-lg font-bold text-heading">Priority actions</h2><p className="mt-1 text-sm text-muted">Start with the work that matters most today.</p><div className="mt-5 grid gap-3 sm:grid-cols-3">{config.actions.map((action) => <button key={action} className="rounded-xl border border-border p-4 text-left text-sm font-semibold text-heading transition hover:border-primary hover:bg-primary-light">{action}</button>)}</div></article>
              <article className="rounded-2xl border border-border bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-heading">Platform status</h2><div className="mt-5 flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-accent" /><span className="text-sm text-body">All services operational</span></div><p className="mt-5 text-sm text-muted">More live activity and reports will appear here as modules are connected.</p></article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
