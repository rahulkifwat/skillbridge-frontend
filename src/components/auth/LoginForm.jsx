"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiExclamationCircle,
  HiCheck,
} from "react-icons/hi2";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa6";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { safeNextPath } from "@/lib/safeNextPath";

const SOCIAL_PROVIDERS = [
  { icon: FaGoogle, label: "Continue with Google" },
  { icon: FaMicrosoft, label: "Continue with Microsoft" },
  { icon: FaApple, label: "Continue with Apple" },
];

// Where each role lands after a successful login.
const LANDING_BY_ROLE = {
  student: "/student",
  instructor: "/instructor",
  employer: "/employer",
  administrator: "/admin",
  partner: "/partner",
  super_admin: "/super-admin",
};

const inputClasses = (hasError) =>
  `w-full rounded-lg border bg-white py-3 pl-11 pr-11 text-sm text-heading placeholder:text-muted focus:outline-none focus:ring-2 disabled:opacity-60 ${
    hasError
      ? "border-red-400 focus:ring-red-400"
      : "border-border focus:ring-brand"
  }`;

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
      <HiExclamationCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
  };

  // Client-side checks so obvious mistakes never cost a round-trip.
  function validate() {
    const errors = {};
    if (!form.email.trim()) errors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errors.email = "Enter a valid email address.";
    if (!form.password) errors.password = "Enter your password.";
    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const user = await login(form.email.trim(), form.password);
      const next = safeNextPath(searchParams.get("next"), LANDING_BY_ROLE[user.role] || "/student");
      router.push(next);
      router.refresh();
    } catch (error) {
      // Field-level messages from the API win; otherwise show the banner.
      if (error.errors) setFieldErrors(error.errors);
      else setFormError(error.message || "Could not log you in. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-heading">Log In</h2>
        <p className="text-sm text-body">Access your account and continue your journey.</p>
      </div>

      {formError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <HiExclamationCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-heading">
            Email Address
          </label>
          <div className="relative">
            <HiEnvelope
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.email)}
              placeholder="Enter your email"
              className={inputClasses(fieldErrors.email)}
            />
          </div>
          <FieldError message={fieldErrors.email} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-heading">
            Password
          </label>
          <div className="relative">
            <HiLockClosed
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={update("password")}
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.password)}
              placeholder="Enter your password"
              className={inputClasses(fieldErrors.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
            >
              {showPassword ? (
                <HiEyeSlash aria-hidden="true" className="h-5 w-5" />
              ) : (
                <HiEye aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
          <FieldError message={fieldErrors.password} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setRemember((prev) => !prev)}
            aria-pressed={remember}
            className="flex items-center gap-2 text-sm text-body"
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                remember ? "border-brand bg-brand text-white" : "border-border bg-white"
              }`}
            >
              {remember && <HiCheck aria-hidden="true" className="h-3 w-3" />}
            </span>
            Remember me
          </button>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-brand hover:text-brand-hover"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" variant="brand" className="w-full" disabled={submitting}>
          {submitting ? "Logging in…" : "Log In"}
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
            disabled
            title="Social sign-in is not configured yet."
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-heading transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
