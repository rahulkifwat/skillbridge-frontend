import {
  HiPlay,
  HiSpeakerWave,
  HiEllipsisVertical,
  HiMicrophone,
  HiBold,
  HiItalic,
  HiUnderline,
  HiListBullet,
  HiNumberedList,
  HiArrowUturnLeft,
  HiArrowUturnRight,
  HiCheck,
  HiArrowRight,
  HiCursorArrowRays,
} from "react-icons/hi2";
import ExamHeader from "@/components/portal/ExamHeader";
import DonutChart from "@/components/portal/widgets/DonutChart";
import {
  examMeta,
  examTabs,
  examInstructions,
  skillWeights,
  listeningSection,
  readingSection,
  writingSection,
  speakingSection,
  examSummary,
  examReminders,
} from "@/data/examContent";

const ACCENTS = {
  primary: { badge: "bg-primary text-white", title: "text-primary", timer: "bg-primary-light text-primary" },
  accent: { badge: "bg-accent text-white", title: "text-accent", timer: "bg-accent-light text-accent" },
  amber: { badge: "bg-amber text-white", title: "text-amber", timer: "bg-amber-100 text-amber" },
  violet: { badge: "bg-violet-500 text-white", title: "text-violet-600", timer: "bg-violet-100 text-violet-600" },
};

const WAVEFORM = [8, 16, 24, 14, 30, 20, 36, 22, 28, 12, 34, 18, 26, 32, 10, 24, 20, 30, 16, 28, 22, 34, 14, 26, 18, 32, 24, 12, 28, 20, 30, 16, 22, 34, 18, 26];

function SectionHead({ section }) {
  const a = ACCENTS[section.accent];
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className={`flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold ${a.badge}`}>{section.number}</span>
        <h2 className={`text-base font-bold tracking-wide ${a.title}`}>{section.title}</h2>
      </div>
      <span className={`rounded-md px-3 py-1 text-xs font-semibold ${a.timer}`}>{section.timer}</span>
    </div>
  );
}

function Option({ opt }) {
  const state = opt.selected
    ? "border-primary bg-primary-light"
    : opt.correct
    ? "border-accent bg-accent-light"
    : "border-border bg-white";
  const marker = opt.selected
    ? "border-primary text-primary"
    : opt.correct
    ? "border-accent bg-accent text-white"
    : "border-border text-muted";
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm ${state}`}>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${marker}`}>
        {opt.selected ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : opt.correct ? <HiCheck className="h-4 w-4" /> : opt.key}
      </span>
      <span className="text-heading">{opt.text}</span>
    </label>
  );
}

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-surface">
      <ExamHeader title={examMeta.title} timeRemaining={examMeta.timeRemaining} candidate={examMeta.candidate} />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-border bg-white p-1 sm:grid-cols-4">
          {examTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                type="button"
                className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors ${
                  tab.active ? "bg-primary-light text-primary" : "text-body hover:bg-surface"
                }`}
              >
                <Icon className="h-5 w-5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mb-6 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-white p-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-3">
              <HiCursorArrowRays className="mt-0.5 h-7 w-7 shrink-0 text-primary" />
              <div>
                <h2 className="text-lg font-bold text-heading">{examInstructions.title}</h2>
                <p className="mt-1 text-sm text-body">{examInstructions.text}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <DonutChart segments={skillWeights.map((s) => ({ value: s.value, color: s.color }))} size={90} thickness={14} gap={3} />
            <ul className="flex-1 space-y-1.5">
              {skillWeights.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-body">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} /> {s.label}
                  </span>
                  <span className="font-semibold text-heading">{s.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Listening */}
          <section className="rounded-2xl border border-border bg-white p-6">
            <SectionHead section={listeningSection} />
            <p className="text-sm text-body">{listeningSection.intro}</p>
            <p className="mt-4 text-sm font-semibold text-heading">{listeningSection.questionLabel}</p>
            <div className="mt-2 flex items-center gap-3 rounded-lg bg-surface px-3 py-2.5">
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <HiPlay className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted">{listeningSection.audio.current} / {listeningSection.audio.total}</span>
              <div className="h-1 flex-1 rounded-full bg-border">
                <div className="h-full w-1 rounded-full bg-primary" />
              </div>
              <HiSpeakerWave className="h-4 w-4 text-muted" />
              <HiEllipsisVertical className="h-4 w-4 text-muted" />
            </div>
            <p className="mt-4 text-sm font-semibold text-heading">{listeningSection.question}</p>
            <div className="mt-3 space-y-2">
              {listeningSection.options.map((opt) => <Option key={opt.key} opt={opt} />)}
            </div>
          </section>

          {/* Reading */}
          <section className="rounded-2xl border border-border bg-white p-6">
            <SectionHead section={readingSection} />
            <p className="text-sm text-body">{readingSection.intro}</p>
            <p className="mt-4 text-sm font-semibold text-heading">{readingSection.passageLabel}</p>
            <div className="mt-2 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-body">
              {readingSection.passage}
            </div>
            <p className="mt-4 text-sm font-semibold text-heading">{readingSection.questionLabel}</p>
            <p className="mt-1 text-sm text-heading">{readingSection.question}</p>
            <div className="mt-3 space-y-2">
              {readingSection.options.map((opt) => <Option key={opt.key} opt={opt} />)}
            </div>
          </section>

          {/* Writing */}
          <section className="rounded-2xl border border-border bg-white p-6">
            <SectionHead section={writingSection} />
            <p className="text-sm text-body">{writingSection.intro}</p>
            <p className="mt-4 text-sm font-semibold text-heading">{writingSection.taskLabel}</p>
            <p className="mt-1 text-sm text-body">{writingSection.task}</p>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <div className="flex items-center gap-1 border-b border-border bg-surface px-3 py-2 text-muted">
                <HiBold className="h-4 w-4" /><HiItalic className="h-4 w-4" /><HiUnderline className="h-4 w-4" />
                <span className="mx-1 h-4 w-px bg-border" />
                <HiListBullet className="h-4 w-4" /><HiNumberedList className="h-4 w-4" />
                <span className="mx-1 h-4 w-px bg-border" />
                <HiArrowUturnLeft className="h-4 w-4" /><HiArrowUturnRight className="h-4 w-4" />
                <span className="ml-auto text-xs">0 words</span>
              </div>
              <textarea
                readOnly
                placeholder={writingSection.placeholder}
                className="h-32 w-full resize-none px-3 py-2.5 text-sm placeholder:text-muted focus:outline-none"
              />
            </div>
            <p className="mt-2 text-xs font-medium text-amber">{writingSection.minWords}</p>
          </section>

          {/* Speaking */}
          <section className="rounded-2xl border border-border bg-white p-6">
            <SectionHead section={speakingSection} />
            <p className="text-sm text-body">{speakingSection.intro}</p>
            <p className="mt-4 text-sm font-semibold text-heading">{speakingSection.partLabel}</p>
            <p className="mt-1 text-sm text-body">{speakingSection.prompt}</p>
            <div className="mt-6 flex flex-col items-center">
              <button type="button" className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-violet-200 bg-violet-100 text-violet-600">
                <HiMicrophone className="h-8 w-8" />
              </button>
              <p className="mt-3 text-sm text-body">{speakingSection.hint}</p>
              <p className="text-xs text-muted">{speakingSection.timeCode}</p>
              <div className="mt-4 flex h-10 w-full items-center justify-center gap-0.5">
                {WAVEFORM.map((h, i) => (
                  <span key={i} className="w-1 rounded-full bg-violet-300" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Summary + Remember */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 lg:col-span-2">
            <h2 className="mb-4 text-base font-bold text-heading">Exam Summary</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {examSummary.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-xs text-muted">{s.label}</span>
                      <span className="text-sm font-bold text-heading">{s.value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-primary-light p-6">
            <h2 className="mb-4 text-base font-bold text-heading">Remember</h2>
            <ul className="space-y-3">
              {examReminders.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-body">
                  <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-center">
          <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover">
            Next: Review & Submit <HiArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
