import { HiArrowRight } from "react-icons/hi2";
import StudentShell from "@/components/portal/StudentShell";
import {
  homeHighlights,
  heroBadges,
  personas,
  homeStatBand,
} from "@/data/studentPortal";

export const metadata = {
  title: "Home | SkillBridge Student Portal",
  description:
    "One platform, unlimited opportunities. Choose who you are and get a personalized learning experience.",
};

// Stand-in for the hero photograph: a world-map dot grid with orbiting badges.
function HeroArtwork() {
  const dots = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 22; col += 1) {
      // Rough continental silhouette so the grid reads as a world map.
      const inLandmass =
        (row > 1 && row < 6 && col > 1 && col < 6) ||
        (row > 3 && row < 8 && col > 3 && col < 7) ||
        (row > 1 && row < 5 && col > 9 && col < 14) ||
        (row > 4 && row < 8 && col > 10 && col < 13) ||
        (row > 1 && row < 5 && col > 14 && col < 20) ||
        (row > 5 && row < 8 && col > 17 && col < 21);
      if (inLandmass) dots.push(`${row}-${col}`);
    }
  }

  return (
    <div className="relative hidden min-h-[300px] flex-1 lg:block">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-22 grid-rows-9 gap-1 p-8 opacity-40"
        style={{ gridTemplateColumns: "repeat(22, minmax(0, 1fr))" }}
      >
        {Array.from({ length: 9 * 22 }, (_, i) => {
          const key = `${Math.floor(i / 22)}-${i % 22}`;
          return (
            <span
              key={key}
              className={`h-1.5 w-1.5 rounded-full ${
                dots.includes(key) ? "bg-primary/50" : "bg-slate-200"
              }`}
            />
          );
        })}
      </div>

      {/* Learner group stand-in */}
      <div
        aria-hidden="true"
        className="absolute inset-x-8 bottom-6 h-40 rounded-3xl bg-gradient-to-tr from-primary/15 via-violet-200/40 to-emerald-200/30 blur-[2px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-16 bottom-10 flex h-28 items-end justify-center gap-3"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`rounded-t-full bg-gradient-to-b ${
              ["from-slate-300", "from-blue-300", "from-amber-300", "from-slate-400", "from-emerald-300"][i]
            } to-transparent`}
            style={{ width: 44, height: [86, 104, 118, 96, 80][i] }}
          />
        ))}
      </div>

      {heroBadges.map(({ icon: Icon, className, color }, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute flex h-12 w-12 items-center justify-center rounded-full ${color} text-white shadow-lg ${className}`}
        >
          <Icon className="h-6 w-6" />
        </span>
      ))}
    </div>
  );
}

export default function StudentHomePage() {
  return (
    <StudentShell
      active="Home"
      promo="learning"
      searchPlaceholder="Search for skills, academies or careers..."
    >
      {/* Hero */}
      <section className="flex flex-col gap-8 px-6 pt-8 lg:flex-row lg:items-center lg:px-10">
        <div className="max-w-xl shrink-0">
          <p className="text-base font-semibold text-primary">
            Welcome to SkillBridge EdTech
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl">
            One Platform.
            <br />
            <span className="text-primary">Unlimited</span> Opportunities.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-body">
            Learn, upskill, and grow at every stage of your journey.
            <br />
            Choose who you are to get your personalized experience.
          </p>

          <ul className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-5">
            {homeHighlights.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={`flex flex-col items-center gap-2 text-center ${
                  i > 0 ? "border-l border-border pl-8" : ""
                }`}
              >
                <Icon aria-hidden="true" className="h-7 w-7 text-primary" />
                <span className="whitespace-pre-line text-xs font-medium leading-snug text-body">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroArtwork />
      </section>

      {/* Who are you? */}
      <section className="px-6 py-10 lg:px-10">
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-16 bg-border sm:w-28" />
          <h2 className="text-2xl font-bold text-heading sm:text-3xl">Who are you?</h2>
          <span aria-hidden="true" className="h-px w-16 bg-border sm:w-28" />
        </div>
        <p className="mt-2 text-center text-sm text-body">
          Select an option to personalize your learning journey.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {personas.map(({ id, icon: Icon, title, body, cta, accent, hoverRing, titleColor, art }) => (
            <li
              key={id}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-white pt-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${hoverRing}`}
            >
              <div className="relative px-3">
                <span
                  className={`absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full ${accent} text-white shadow-md`}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                {/* Persona photo stand-in */}
                <div
                  aria-hidden="true"
                  className={`h-24 rounded-lg bg-gradient-to-br ${art} opacity-80`}
                />
              </div>

              <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center">
                <h3 className={`whitespace-pre-line text-base font-bold leading-snug ${titleColor}`}>
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-body">{body}</p>
                <button
                  type="button"
                  className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg ${accent} px-3 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90`}
                >
                  {cta}
                  <HiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Stat band */}
      <section className="px-6 pb-10 lg:px-10">
        <ul className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-white px-6 py-6 shadow-sm sm:grid-cols-3 lg:grid-cols-5">
          {homeStatBand.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon aria-hidden="true" className="h-9 w-9 shrink-0 text-primary" />
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-heading">{value}</span>
                <span className="text-xs text-body">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </StudentShell>
  );
}
