import Link from "next/link";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiShieldCheck,
  HiAcademicCap,
  HiBriefcase,
  HiDocumentCheck,
  HiChartBar,
} from "react-icons/hi2";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa6";
import BrandLogo from "@/components/common/BrandLogo";
import Button from "@/components/common/Button";
import Avatar from "@/components/common/Avatar";
import DarkSection from "@/components/marketing/DarkSection";

export const metadata = {
  title: "Log In | SkillBridge",
  description:
    "Log in to continue your learning journey, access your academies, track your progress and unlock global opportunities.",
};

const FEATURES = [
  {
    icon: HiAcademicCap,
    title: "World-Class Academies",
    body: "Learn in-demand skills with real-world simulations.",
  },
  {
    icon: HiBriefcase,
    title: "Global Job Opportunities",
    body: "Access remote jobs from top companies worldwide.",
  },
  {
    icon: HiDocumentCheck,
    title: "Industry Recognized Certifications",
    body: "Earn certificates that boost your credibility and career.",
  },
  {
    icon: HiChartBar,
    title: "Track Your Progress",
    body: "Monitor your growth and achieve your career goals.",
  },
];

const SOCIAL_PROVIDERS = [
  { icon: FaGoogle, label: "Continue with Google" },
  { icon: FaMicrosoft, label: "Continue with Microsoft" },
  { icon: FaApple, label: "Continue with Apple" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left: navy brand panel */}
      <DarkSection className="w-full px-6 py-10 sm:px-10 lg:w-1/2 lg:px-14 lg:py-12">
        {/* Placeholder globe/network art (no photo assets available). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full border border-brand-bright/20 bg-brand/10 blur-2xl"
        />

        <div className="flex flex-col gap-10">
          <BrandLogo inverted />

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Welcome Back!
              <span className="mt-1 block text-brand-mint">
                Your Global Career Starts Here.
              </span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-white/70">
              Log in to continue your learning journey, access your academies,
              track your progress and unlock global opportunities.
            </p>
          </div>

          <ul className="flex max-w-md flex-col gap-5">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-line bg-brand/15">
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-mint" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">{title}</span>
                  <span className="text-sm leading-relaxed text-white/60">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <figure className="mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-ink-line bg-white/5 p-5 backdrop-blur-sm">
          <Avatar name="Carlos M." size="md" index={0} />
          <div className="flex flex-col gap-2">
            <blockquote className="text-sm leading-relaxed text-white/85">
              &ldquo;SkillBridge gave me the skills, confidence and opportunity
              to build a better future.&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-brand-mint">Carlos M.</span>
              <span className="text-white/30">|</span>
              <span className="text-white/60">Software Developer at RemoteCo</span>
            </figcaption>
          </div>
        </figure>
      </DarkSection>

      {/* Right: form panel */}
      <div className="flex w-full flex-col bg-surface px-6 py-10 sm:px-10 lg:w-1/2 lg:px-14 lg:py-12">
        <div className="flex items-center justify-end gap-4">
          <span className="text-sm text-body">New to SkillBridge?</span>
          <Button
            href="/signup"
            variant="brand-light"
            className="border-brand/40 px-4 py-2"
          >
            Create an Account
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-bold tracking-tight text-heading">Log In</h2>
              <p className="text-sm text-body">
                Access your account and continue your journey.
              </p>
            </div>

            <form className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-heading"
                >
                  Email Address
                </label>
                <div className="relative">
                  <HiEnvelope
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="email"
                    type="email"
                    readOnly
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-3 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-heading"
                >
                  Password
                </label>
                <div className="relative">
                  <HiLockClosed
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="password"
                    type="password"
                    readOnly
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-border bg-white py-3 pl-11 pr-11 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                  <HiEye
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded border border-border bg-white"
                  />
                  <span className="text-sm text-body">Remember me</span>
                </span>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-brand hover:text-brand-hover"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" variant="brand" className="w-full">
                Log In
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted">or continue with</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-3">
              {SOCIAL_PROVIDERS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-body">
              <HiShieldCheck aria-hidden="true" className="h-5 w-5 text-brand" />
              Your data is secure with us.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-body">
          By logging in, you agree to our{" "}
          <Link href="/terms" className="font-medium text-brand hover:text-brand-hover">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-brand hover:text-brand-hover">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
