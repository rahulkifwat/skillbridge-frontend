import {
  HiSquares2X2,
  HiClipboardDocumentCheck,
  HiFolder,
  HiCodeBracketSquare,
  HiArrowPathRoundedSquare,
  HiRocketLaunch,
  HiShieldExclamation,
  HiChartBarSquare,
  HiBookOpen,
  HiUserGroup,
  HiChartPie,
  HiCog6Tooth,
  HiDocumentText,
  HiCheckCircle,
  HiServerStack,
  HiLockClosed,
  HiUsers,
  HiCreditCard,
  HiBell,
} from "react-icons/hi2";

export const engineerUser = {
  name: "John Engineer",
  role: "Senior Engineer",
  greeting: "Welcome back, John!",
  subtitle: "Here's what's happening with your engineering work today.",
};

export const engineerNav = [
  { label: "Dashboard", icon: HiSquares2X2, active: true },
  { label: "My Tasks", icon: HiClipboardDocumentCheck },
  { label: "Projects", icon: HiFolder },
  { label: "Code Review", icon: HiCodeBracketSquare },
  { label: "CI/CD Pipelines", icon: HiArrowPathRoundedSquare },
  { label: "Deployments", icon: HiRocketLaunch },
  { label: "Incidents", icon: HiShieldExclamation },
  { label: "Monitoring", icon: HiChartBarSquare },
  { label: "Knowledge Base", icon: HiBookOpen },
  { label: "Team Directory", icon: HiUserGroup },
  { label: "Reports & Analytics", icon: HiChartPie },
  { label: "Settings", icon: HiCog6Tooth },
];

export const engineerStats = [
  {
    label: "My Tasks",
    value: "12",
    caption: "5 in progress",
    icon: HiClipboardDocumentCheck,
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
    bar: "bg-primary",
    barWidth: "42%",
  },
  {
    label: "Code Reviews",
    value: "8",
    caption: "3 pending",
    icon: HiCodeBracketSquare,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    bar: "bg-violet-500",
    barWidth: "60%",
  },
  {
    label: "Deployments",
    value: "3",
    caption: "1 in progress",
    icon: HiRocketLaunch,
    iconBg: "bg-accent-light",
    iconColor: "text-accent",
    bar: "bg-accent",
    barWidth: "33%",
  },
  {
    label: "Incidents",
    value: "1",
    caption: "High priority",
    captionColor: "text-red-500",
    icon: HiShieldExclamation,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    bar: "bg-red-500",
    barWidth: "20%",
  },
];

export const sprint = {
  label: "Sprint 24 (May 1 – May 14)",
  percent: 68,
  storyPoints: { done: 34, total: 50 },
  breakdown: [
    { label: "Completed", value: "34 pts", color: "bg-primary" },
    { label: "In Progress", value: "10 pts", color: "bg-primary/40" },
    { label: "To Do", value: "6 pts", color: "bg-surface-alt" },
  ],
};

export const activeTasks = [
  { id: "SB-482", title: "Fix authentication bug in SSO flow", priority: "High", due: "Due Today", dueColor: "text-red-500" },
  { id: "SB-487", title: "Implement user profile update API", priority: "Medium", due: "Due May 10" },
  { id: "SB-491", title: "Add unit tests for payment service", priority: "Medium", due: "Due May 12" },
  { id: "SB-493", title: "Optimize database query for reports", priority: "Low", due: "Due May 14" },
  { id: "SB-494", title: "Update API documentation for v2", priority: "Low", due: "Due May 15" },
];

export const priorityStyles = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-amber-100 text-amber-600",
  Low: "bg-slate-100 text-slate-500",
};

export const pipelines = [
  { name: "production", branch: "main", status: "Success", time: "2h ago" },
  { name: "staging", branch: "develop", status: "Success", time: "4h ago" },
  { name: "review-app", branch: "feature/SB-491", status: "Running", time: "12m ago" },
  { name: "hotfix", branch: "hotfix/login-issue", status: "Success", time: "6h ago" },
];

export const pipelineStatusStyles = {
  Success: "bg-accent-light text-accent",
  Running: "bg-primary-light text-primary",
  Failed: "bg-red-100 text-red-600",
};

// spark: normalized 0-1 points for the sparkline
export const systemHealth = [
  { name: "API Gateway", uptime: "99.9%", icon: HiServerStack, color: "text-accent", spark: [0.5, 0.6, 0.55, 0.7, 0.6, 0.8, 0.7, 0.85], stroke: "#10b981" },
  { name: "Auth Service", uptime: "99.8%", icon: HiLockClosed, color: "text-accent", spark: [0.6, 0.5, 0.65, 0.6, 0.75, 0.7, 0.8, 0.78], stroke: "#10b981" },
  { name: "User Service", uptime: "99.7%", icon: HiUsers, color: "text-accent", spark: [0.55, 0.6, 0.5, 0.7, 0.65, 0.75, 0.7, 0.8], stroke: "#10b981" },
  { name: "Payment Service", uptime: "98.6%", icon: HiCreditCard, color: "text-amber", spark: [0.4, 0.6, 0.45, 0.7, 0.5, 0.75, 0.55, 0.7], stroke: "#f59e0b" },
  { name: "Notification Service", uptime: "99.9%", icon: HiBell, color: "text-accent", spark: [0.6, 0.7, 0.65, 0.75, 0.7, 0.8, 0.78, 0.85], stroke: "#10b981" },
];

export const activityFeed = [
  { type: "avatar", name: "Sarah Johnson", text: "approved your pull request #1254", time: "10m ago" },
  { type: "icon", icon: HiCheckCircle, iconColor: "text-accent", iconBg: "bg-accent-light", text: "Deployment to staging completed successfully", time: "25m ago" },
  { type: "icon", icon: HiShieldExclamation, iconColor: "text-red-500", iconBg: "bg-red-100", text: "New incident reported: Payment Service latency", time: "1h ago" },
  { type: "icon", icon: HiCodeBracketSquare, iconColor: "text-primary", iconBg: "bg-primary-light", text: "Code review requested for SB-491", time: "2h ago" },
];

export const engineeringMetrics = [
  { label: "Code Commits", value: "128", delta: "12%", stroke: "#2563eb", spark: [0.3, 0.5, 0.4, 0.6, 0.55, 0.7, 0.6, 0.8, 0.75, 0.9] },
  { label: "PRs Merged", value: "42", delta: "8%", stroke: "#8b5cf6", spark: [0.4, 0.35, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65, 0.8, 0.85] },
  { label: "Test Coverage", value: "87%", delta: "5%", stroke: "#10b981", spark: [0.5, 0.55, 0.5, 0.6, 0.65, 0.6, 0.7, 0.75, 0.8, 0.88] },
];

export const docIcon = HiDocumentText;
