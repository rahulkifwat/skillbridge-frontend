import Container from "@/components/common/Container";
import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <section className="bg-surface py-10 sm:py-16">
      <Container className="flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-heading sm:text-3xl">
          Real Results. Real Impact.
        </h2>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 rounded-2xl border border-border bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8 md:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <Icon className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-heading sm:text-xl">{stat.value}</span>
                  <span className="text-xs text-muted">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
