"use client";

import { useState } from "react";
import { HiCheckCircle, HiExclamationTriangle, HiPaperAirplane } from "react-icons/hi2";
import { contactApi } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

// Must stay in sync with INQUIRY_TYPES in backend/src/routes/contactRoutes.js.
export const INQUIRY_TYPES = [
  "student",
  "employer",
  "university",
  "school",
  "government",
  "partner",
  "other",
];

const EMPTY = {
  name: "",
  email: "",
  organization: "",
  inquiryType: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldClasses(hasError) {
  return `w-full rounded-lg border bg-white px-4 py-3 text-sm text-heading outline-none transition placeholder:text-muted/70 focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-border focus:border-brand focus:ring-brand/15"
  }`;
}

export default function ContactForm() {
  const { t, locale } = useLanguage();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [formError, setFormError] = useState("");

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear the field error as soon as the user starts fixing it.
    setErrors((previous) => (previous[field] ? { ...previous, [field]: undefined } : previous));
  };

  // Mirrors the express-validator rules on POST /api/contact so the user gets
  // feedback without a round trip; the server stays the real enforcement layer.
  function validate() {
    const next = {};
    if (values.name.trim().length < 2) next.name = t("contact.form.errors.name");
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = t("contact.form.errors.email");
    if (!INQUIRY_TYPES.includes(values.inquiryType))
      next.inquiryType = t("contact.form.errors.inquiryType");
    if (values.subject.trim().length < 2) next.subject = t("contact.form.errors.subject");
    if (values.message.trim().length < 10) next.message = t("contact.form.errors.message");
    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      await contactApi.submit({ ...values, locale });
      setValues(EMPTY);
      setStatus("success");
    } catch (error) {
      // The API returns a { field: message } map for validation failures.
      if (error?.errors) setErrors(error.errors);
      setFormError(error?.message || t("contact.form.genericError"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/25 bg-brand-light p-8 text-center">
        <HiCheckCircle className="mx-auto h-12 w-12 text-brand" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-heading">{t("contact.form.successTitle")}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
          {t("contact.form.successBody")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          {t("contact.form.sendAnother")}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-white p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
        {t("contact.form.eyebrow")}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-heading">
        {t("contact.form.title")}
      </h2>
      <p className="mt-1 text-sm text-body">{t("contact.form.subtitle")}</p>

      {formError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <HiExclamationTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
          {formError}
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label={t("contact.form.name")}
          error={errors.name}
          required
        >
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            placeholder={t("contact.form.namePlaceholder")}
            className={fieldClasses(errors.name)}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field
          id="contact-email"
          label={t("contact.form.email")}
          error={errors.email}
          required
        >
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            placeholder={t("contact.form.emailPlaceholder")}
            className={fieldClasses(errors.email)}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field
          id="contact-organization"
          label={t("contact.form.organization")}
          hint={t("contact.form.organizationOptional")}
          error={errors.organization}
        >
          <input
            id="contact-organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={update("organization")}
            placeholder={t("contact.form.organizationPlaceholder")}
            className={fieldClasses(errors.organization)}
          />
        </Field>

        <Field
          id="contact-inquiry-type"
          label={t("contact.form.inquiryType")}
          error={errors.inquiryType}
          required
        >
          <select
            id="contact-inquiry-type"
            name="inquiryType"
            value={values.inquiryType}
            onChange={update("inquiryType")}
            className={fieldClasses(errors.inquiryType)}
            aria-invalid={Boolean(errors.inquiryType)}
          >
            <option value="">{t("contact.form.inquiryPlaceholder")}</option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`contact.form.options.${type}`)}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="contact-subject"
            label={t("contact.form.subject")}
            error={errors.subject}
            required
          >
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={update("subject")}
              placeholder={t("contact.form.subjectPlaceholder")}
              className={fieldClasses(errors.subject)}
              aria-invalid={Boolean(errors.subject)}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field
            id="contact-message"
            label={t("contact.form.message")}
            error={errors.message}
            required
          >
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={values.message}
              onChange={update("message")}
              placeholder={t("contact.form.messagePlaceholder")}
              className={`${fieldClasses(errors.message)} resize-y`}
              aria-invalid={Boolean(errors.message)}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? t("contact.form.submitting") : t("contact.form.submit")}
        {!submitting && <HiPaperAirplane className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  );
}

function Field({ id, label, hint, error, required = false, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 text-sm font-semibold text-heading">
        {label}
        {required ? (
          <span className="text-brand" aria-hidden="true">
            *
          </span>
        ) : (
          hint && <span className="text-xs font-normal text-muted">({hint})</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
