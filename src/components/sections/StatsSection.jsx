import Container from "@/components/common/Container";
import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <h2 className="text-2xl font-bold text-heading sm:text-3xl">
          Real Results. Real Impact.
        </h2>
        <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xl font-bold text-heading">{stat.value}</span>
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
