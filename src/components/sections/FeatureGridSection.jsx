import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { features } from "@/data/content";

export default function FeatureGridSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading
          title="Everything You Need to Succeed"
          subtitle="A complete ecosystem designed for real results."
        />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div F
                key={feature.title}
                className="relative flex flex-col gap-3 rounded-xl border border-border bg-white p-5 shadow-sm"
              >
                {feature.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-accent">
                    {feature.badge}
                  </span>
                )}
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-heading">
                  {feature.title}
                </h3>
                <p className="text-sm text-body">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
