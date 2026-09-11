"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiEnvelope,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiExclamationCircle,
  HiUser,
  HiBriefcase,
} from "react-icons/hi2";
import { FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa6";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { landingForRole } from "@/lib/roleLanding";
import { safeNextPath } from "@/lib/safeNextPath";

const SOCIAL_PROVIDERS = [
  { icon: FaGoogle, label: "Continue with Google" },
  { icon: FaMicrosoft, label: "Continue with Microsoft" },
  { icon: FaApple, label: "Continue with Apple" },
];

const ACCOUNT_TYPES = [
  { id: "student", label: "Student" },
  { id: "instructor", label: "Instructor" },
  { id: "employer", label: "Employer" },
  { id: "partner", label: "Partner" },
];

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

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
  };

  function validate() {
    const errors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errors.fullName = "Enter your full name.";
    }
    if (!form.email.trim()) errors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!form.password) errors.password = "Create a password.";
    else if (form.password.length < 8) errors.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) errors.confirmPassword = "Confirm your password.";
    else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
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
      const user = await register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      const next = safeNextPath(searchParams.get("next"), landingForRole(user.role));
      router.push(next);
      router.refresh();
    } catch (error) {
      if (error.errors) setFieldErrors(error.errors);
      else setFormError(error.message || "Could not create your account. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-heading">Create Account</h2>
        <p className="text-sm text-body">Start your learning journey with SkillBridge.</p>
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
          <label htmlFor="fullName" className="text-sm font-semibold text-heading">
            Full Name
          </label>
          <div className="relative">
            <HiUser
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={update("fullName")}
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.fullName)}
              placeholder="Enter your full name"
              className={inputClasses(fieldErrors.fullName)}
            />
          </div>
          <FieldError message={fieldErrors.fullName} />
        </div>

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
          <label htmlFor="role" className="text-sm font-semibold text-heading">
            I am a
          </label>
          <div className="relative">
            <HiBriefcase
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={update("role")}
              disabled={submitting}
              className={`${inputClasses(false)} appearance-none pr-10`}
            >
              {ACCOUNT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
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
              autoComplete="new-password"
              value={form.password}
              onChange={update("password")}
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.password)}
              placeholder="At least 8 characters"
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-heading">
            Confirm Password
          </label>
          <div className="relative">
            <HiLockClosed
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              disabled={submitting}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              placeholder="Re-enter your password"
              className={inputClasses(fieldErrors.confirmPassword)}
            />
          </div>
          <FieldError message={fieldErrors.confirmPassword} />
        </div>

        <Button type="submit" variant="brand" className="w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create Account"}
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
