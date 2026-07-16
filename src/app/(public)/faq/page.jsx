import {
  HiPlus,
  HiLifebuoy,
  HiEnvelope,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import DarkSection from "@/components/marketing/DarkSection";
import { faqs, trustStats } from "@/data/faq";

export const metadata = {
  title: "FAQ — SkillBridge EdTech",
  description:
    "Find answers to the most common questions about SkillBridge EdTech — academies, simulations, pricing, certificates, job support and payment security.",
};

// Static FAQ card. The "+" is a decorative affordance from the design, not an
// interactive accordion — these pages are server components.
function FaqCard({ faq }) {
  const Icon = faq.icon;
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-6">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-brand" />
      </span>

      <div className="flex-1">
        <h3 className="text-base font-bold text-heading">{faq.question}</h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{faq.answer}</p>
      </div>

      <HiPlus className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
    </div>
  );
}

function StillHaveQuestions() {
  return (
    <DarkSection className="rounded-2xl">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:gap-10">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/20"
          aria-hidden="true"
        >
          <HiLifebuoy className="h-7 w-7 text-brand-mint" />
        </span>

        <div className="flex-1">
          <h2 className="text-xl font-bold sm:text-2xl">
            Still have questions?
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Our support team is ready to help you.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center lg:gap-8">
          <div className="flex items-center gap-3">
            <HiEnvelope
              className="h-5 w-5 shrink-0 text-white/70"
              aria-hidden="true"
            />
            <span className="text-sm text-white">support@skillbridge.com</span>
          </div>

          <span
            className="hidden h-10 w-px bg-ink-line sm:block"
            aria-hidden="true"
          />

          <div className="flex items-center gap-3">
            <HiChatBubbleLeftRight
              className="h-5 w-5 shrink-0 text-white/70"
              aria-hidden="true"
            />
            <span className="leading-tight">
              <span className="block text-sm text-white">Live Chat</span>
              <span className="block text-xs text-white/60">
                Available 24/7
              </span>
            </span>
          </div>
        </div>

        <Button
          href="/contact"
          variant="brand-outline"
          className="shrink-0 tracking-wide"
        >
          CONTACT US
        </Button>
      </div>
    </DarkSection>
  );
}

function TrustRow() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {trustStats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="flex items-center gap-3">
            <Icon className="h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-heading">
                {stat.value}
              </span>
              <span className="text-sm text-body">{stat.label}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function FaqPage() {
  return (
    <section className="bg-surface py-14 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mt-3 text-base text-body">
            Find answers to the most common questions about SkillBridge EdTech.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <FaqCard key={faq.question} faq={faq} />
          ))}
        </div>

        <div className="mt-8">
          <StillHaveQuestions />
        </div>

        <div className="mt-10">
          <TrustRow />
        </div>
      </Container>
    </section>
  );
}
