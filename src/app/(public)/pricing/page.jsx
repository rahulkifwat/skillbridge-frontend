import Link from "next/link";
import { HiArrowRight, HiCheckCircle, HiArrowLongRight } from "react-icons/hi2";
import Container from "@/components/common/Container";
import DarkSection from "@/components/marketing/DarkSection";
import CtaBanner from "@/components/marketing/CtaBanner";
import { academies } from "@/data/marketing";
import {
  pricingHeroFeatures,
  billingToggle,
  plans,
  allPlansInclude,
  pricingTestimonial,
  pricingCtaStats,
} from "@/data/pricing";

export const metadata = {
  title: "Pricing — SkillBridge EdTech",
  description:
    "Choose the plan that fits your goals. All plans include access to our AI-powered learning platform and career resources.",
};

function PlanCard({ plan }) {
  const Icon = plan.icon;

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white p-6 ${
        plan.featured ? "border-2 border-brand shadow-md" : "border border-border"
      }`}
    >
      {plan.ribbon && (
        <span className="absolute -top-3 left-6 rounded-md bg-brand px-3 py-1 text-[10px] font-bold tracking-wide text-white">
          {plan.ribbon}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-lg font-bold ${plan.featured ? "text-brand" : "text-violet-800"}`}>
            {plan.name}
          </h3>
          <p className="mt-1 text-sm text-body">{plan.tagline}</p>
        </div>
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${plan.tint}`}
        >
          <Icon className={`h-6 w-6 ${plan.text}`} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5">
        {plan.customPrice ? (
          <p className="text-2xl font-bold text-blue-800">{plan.price}</p>
        ) : (
          <p className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold ${plan.featured ? "text-brand" : "text-heading"}`}>
              {plan.price}
            </span>
            <span className="text-sm text-muted">{plan.unit}</span>
          </p>
        )}
        {plan.billing && <p className="mt-1 text-xs text-muted">{plan.billing}</p>}
        {plan.savePill && (
          <span className="mt-3 inline-flex rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            {plan.savePill}
          </span>
        )}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <HiCheckCircle className={`mt-0.5 h-4 w-4 shrink-0 ${plan.check}`} aria-hidden="true" />
            <span className="text-sm text-body">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.cta.href}
        className={`mt-7 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${plan.buttonClass}`}
      >
        {plan.cta.label}
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const includeLeft = allPlansInclude.slice(0, 5);
  const includeRight = allPlansInclude.slice(5);

  return (
    <>
      {/* Hero */}
      <DarkSection>
        <Container className="grid gap-10 py-14 lg:grid-cols-2 lg:py-16">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Invest in Your Future.
              <br />
              <span className="text-brand-mint">Unlock Global Opportunities.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-white/70">
              Choose the plan that fits your goals. All plans include access to our AI-powered learning platform and
              career resources.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingHeroFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="text-center sm:text-left lg:text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-bright/40 bg-brand/10">
                    <Icon className="h-6 w-6 text-brand-mint" aria-hidden="true" />
                  </span>
                  <h2 className="mt-3 text-sm font-semibold text-white">{f.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{f.detail}</p>
                </div>
              );
            })}
          </div>
        </Container>

        {/* Static billing toggle */}
        <Container className="flex flex-col items-center pb-10">
          <div
            className="inline-flex items-center rounded-full border border-ink-line bg-ink-soft p-1"
            role="group"
            aria-label="Billing period"
          >
            {billingToggle.options.map((option) => (
              <span
                key={option.label}
                aria-current={option.active ? "true" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                  option.active ? "bg-white text-heading" : "text-white/70"
                }`}
              >
                {option.label}
                {option.badge && (
                  <span className="rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-bold text-brand">
                    {option.badge}
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
            <HiArrowLongRight className="h-4 w-4 rotate-180" aria-hidden="true" />
            {billingToggle.note}
          </p>
        </Container>
      </DarkSection>

      {/* Plan cards */}
      <section className="bg-white py-14">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </Container>
      </section>

      {/* Academies + inclusions + testimonial */}
      <section className="bg-white pb-14">
        <Container>
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border p-6 lg:grid-cols-12 lg:p-8">
            {/* 9 World-Class Academies */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-heading">9 World-Class Academies</h2>
                <Link
                  href="/academies"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-brand hover:underline"
                >
                  Explore All <HiArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5">
                {academies.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.name} className="flex flex-col items-center gap-2 text-center">
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${a.tint}`}
                      >
                        <Icon className={`h-5 w-5 ${a.text}`} aria-hidden="true" />
                      </span>
                      <p className="text-[11px] font-medium leading-tight text-heading">
                        {a.n}. {a.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Plans Include */}
            <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
              <h2 className="text-lg font-bold text-heading">All Plans Include</h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {[includeLeft, includeRight].map((column, i) => (
                  <ul key={i} className="flex flex-col gap-3">
                    {column.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <HiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        <span className="text-xs text-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="lg:col-span-3">
              <figure className="rounded-xl border border-border bg-surface p-5">
                <span className="text-3xl font-bold leading-none text-brand/40" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-1 text-sm leading-relaxed text-body">
                  {pricingTestimonial.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-alt text-[9px] text-muted"
                    aria-hidden="true"
                  >
                    Photo
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-heading">{pricingTestimonial.name}</span>
                    <span className="text-xs text-muted">{pricingTestimonial.role}</span>
                    <span className="text-xs text-muted">{pricingTestimonial.hiredAt}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-white pb-14">
        <Container>
          <CtaBanner
            title="Ready to Start Your Journey?"
            subtitle="Join thousands of students building global careers with SkillBridge EdTech."
            primary={{ label: "Take Career Assessment", href: "/assessment" }}
            secondary={{ label: "Explore Academies", href: "/academies" }}
            features={pricingCtaStats}
            icon={
              <span className="flex h-24 w-24 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-ink-soft to-ink-line/40 text-[10px] text-white/30">
                Secure
              </span>
            }
          />
        </Container>
      </section>
    </>
  );
}
