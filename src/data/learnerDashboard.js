import {
  HiHome,
  HiSquares2X2,
  HiClipboardDocumentCheck,
  HiAcademicCap,
  HiCpuChip,
  HiSparkles,
  HiBriefcase,
  HiUserGroup,
  HiUsers,
  HiChatBubbleLeftRight,
  HiCreditCard,
  HiTrophy,
  HiCog6Tooth,
  HiBookOpen,
  HiCheckBadge,
  HiStar,
  HiFire,
  HiRocketLaunch,
  HiArrowTrendingUp,
  HiChartBar,
} from "react-icons/hi2";

export const learnerUser = {
  name: "Maria Gomez",
  level: "Intermediate",
  points: 1250,
  xpGoal: 2000,
  greeting: "Welcome back, Maria!",
  quote: "“The best way to predict the future is to create it.”",
  quoteAuthor: "– Peter Drucker",
};

// Sidebar for the "My Space" screen
export const mySpaceNav = [
  { label: "My Space", icon: HiHome, active: true },
  { label: "Dashboard", icon: HiSquares2X2 },
  { label: "Assessments", icon: HiClipboardDocumentCheck },
  { label: "My Learning", icon: HiBookOpen },
  { label: "Simulations", icon: HiCpuChip },
  { label: "AI Coach", icon: HiSparkles },
  { label: "Career Center", icon: HiBriefcase },
  { label: "Jobs & Projects", icon: HiBriefcase },
  { label: "Mentorship", icon: HiUserGroup },
  { label: "Community", icon: HiUsers },
  { label: "Messages", icon: HiChatBubbleLeftRight },
  { label: "Payments", icon: HiCreditCard },
  { label: "Certificates", icon: HiTrophy },
  { label: "Settings", icon: HiCog6Tooth },
];

// Sidebar for the "Home" screen
export const homeNav = [
  { label: "Home", icon: HiHome, active: true },
  { label: "Assessment", icon: HiClipboardDocumentCheck },
  { label: "Learning Academy", icon: HiAcademicCap },
  { label: "Simulations", icon: HiCpuChip, badge: "85%" },
  { label: "AI Coach", icon: HiSparkles },
  { label: "Career Center", icon: HiBriefcase },
  { label: "Jobs & Projects", icon: HiBriefcase },
  { label: "Mentorship", icon: HiUserGroup },
  { label: "Community", icon: HiUsers },
  { label: "Messages", icon: HiChatBubbleLeftRight, badge: "3" },
  { label: "Certificates", icon: HiTrophy },
  { label: "Payments", icon: HiCreditCard },
  { label: "My Space", icon: HiHome },
];

export const homeAdminNav = [{ label: "Dashboard", icon: HiSquares2X2 }];

export const mySpaceStats = [
  { label: "My Learning", value: "5", caption: "Courses in progress", cta: "Continue Learning", icon: HiBookOpen, iconBg: "bg-primary-light", iconColor: "text-primary" },
  { label: "Assessments", value: "2", caption: "Completed", cta: "View Results", icon: HiCheckBadge, iconBg: "bg-accent-light", iconColor: "text-accent" },
  { label: "Simulations", value: "3", caption: "In Progress", cta: "Go to Simulations", icon: HiCpuChip, iconBg: "bg-violet-100", iconColor: "text-violet-600" },
  { label: "Career Matches", value: "8", caption: "New Opportunities", cta: "View Matches", icon: HiBriefcase, iconBg: "bg-amber-100", iconColor: "text-amber" },
];

export const homeStats = [
  { label: "My Learning", value: "5", caption: "Courses in Progress", cta: "Continue Learning", icon: HiBookOpen, iconBg: "bg-primary-light", iconColor: "text-primary" },
  { label: "Assessments", value: "2", caption: "Completed", cta: "View Results", icon: HiCheckBadge, iconBg: "bg-accent-light", iconColor: "text-accent" },
  { label: "Simulations", value: "85%", caption: "Of training time", cta: "Go to Simulations", icon: HiCpuChip, iconBg: "bg-primary-light", iconColor: "text-primary" },
  { label: "Career Matches", value: "8", caption: "New Opportunities", cta: "View Matches", icon: HiBriefcase, iconBg: "bg-amber-100", iconColor: "text-amber" },
];

export const learningProgress = [
  { title: "Digital Marketing Fundamentals", description: "Master the essentials of digital marketing and online customer engagement.", percent: 75, color: "bg-primary" },
  { title: "Data Analysis with Excel", description: "Learn to clean, analyze and visualize data like a professional.", percent: 40, color: "bg-accent" },
  { title: "Professional Communication", description: "Improve your writing, speaking and presentation skills.", percent: 20, color: "bg-violet-500" },
];

export const schedule = [
  { month: "MAY", day: "30", title: "Live Simulation", detail: "Customer Service", time: "10:00 AM – 11:00 AM", tag: "Upcoming" },
  { month: "MAY", day: "31", title: "AI Coach Session", detail: "Resume Review", time: "02:00 PM – 02:30 PM", tag: "Upcoming" },
  { month: "JUN", day: "02", title: "Webinar", detail: "Remote Work Success", time: "04:00 PM – 05:00 PM", tag: "Upcoming" },
];

export const skills = [
  { label: "Communication", value: 80, color: "#2563eb" },
  { label: "Problem Solving", value: 70, color: "#8b5cf6" },
  { label: "Digital Literacy", value: 85, color: "#10b981" },
  { label: "Teamwork", value: 75, color: "#f59e0b" },
  { label: "Adaptability", value: 60, color: "#ef4444" },
  { label: "Critical Thinking", value: 65, color: "#06b6d4" },
];

export const aiCoachActions = [
  "Improve my resume",
  "Prepare for an interview",
  "Find skill gaps",
  "Explore career paths",
];

export const recommendations = [
  { tag: "COURSE", tagColor: "bg-primary-light text-primary", title: "Project Management Essentials", rating: 4.6, reviews: 120, meta: "Beginner" },
  { tag: "SIMULATION", tagColor: "bg-violet-100 text-violet-600", title: "Sales Call Simulation", rating: 4.8, reviews: 98, meta: "Practice" },
  { tag: "JOB MATCH", tagColor: "bg-accent-light text-accent", title: "Remote Customer Success Specialist", match: "92%", meta: "United States" },
  { tag: "WEBINAR", tagColor: "bg-amber-100 text-amber", title: "How to Build Your Personal Brand", meta: "Jun 5, 2026 • 3:00 PM", sub: "Live Online" },
];

// ---- Home-specific ----

export const homeProgress = { overall: 72, streak: 12, points: 1250 };

export const homeSimulations = {
  percent: 85,
  items: [
    { label: "Customer Service Simulation", status: "Completed" },
    { label: "Sales Call Simulation", status: "In Progress" },
    { label: "Business Meeting Simulation", status: "Completed" },
    { label: "Project Management Simulation", status: "In Progress" },
  ],
};

export const careerMatches = [
  { title: "Digital Marketing Assistant", meta: "Remote • Full-time", match: "92% Match", color: "bg-primary" },
  { title: "Data Analyst Junior", meta: "United States • Full-time", match: "91% Match", color: "bg-accent" },
  { title: "Customer Success Specialist", meta: "Remote • Full-time", match: "90% Match", color: "bg-violet-500" },
];

export const jobsProjects = [
  { type: "Freelance Project", title: "Social Media Content Creation", meta: "Budget: $250 – $400", tag: "New" },
  { type: "Full-time Job", title: "Marketing Coordinator", meta: "United States", tag: "New" },
  { type: "Project", title: "Market Research Analysis", meta: "Budget: $300 – $600", tag: "New" },
];

export const communityPost = {
  name: "John D.",
  time: "2h ago in General Discussion",
  text: "Just completed the Customer Service Simulation. Great experience!",
  likes: 24,
  comments: 12,
  others: 15,
};

export const achievements = [
  { title: "First Step", detail: "Complete your first course", icon: HiStar, color: "text-primary", bg: "bg-primary-light" },
  { title: "Simulation Pro", detail: "Complete 10 simulations", icon: HiTrophy, color: "text-amber", bg: "bg-amber-100" },
  { title: "Streak Master", detail: "Maintain a 7-day streak", icon: HiFire, color: "text-red-500", bg: "bg-red-100" },
  { title: "Top Performer", detail: "Score 90%+ in assessments", icon: HiRocketLaunch, color: "text-accent", bg: "bg-accent-light" },
];

export const statusStyles = {
  Completed: "text-accent",
  "In Progress": "text-primary",
};

export const homeIcons = { trending: HiArrowTrendingUp, chart: HiChartBar };
