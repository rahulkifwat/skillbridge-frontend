import Image from "next/image";
import { HiClock } from "react-icons/hi2";
import Avatar from "@/components/common/Avatar";

export default function ExamHeader({ title, timeRemaining, candidate }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/skillbridge-logo-mark.png" alt="SkillBridge" width={1231} height={698} className="h-8 w-auto" />
          <span className="text-lg font-bold text-heading">SkillBridge</span>
          <span className="hidden border-l border-border pl-3 text-sm text-body sm:inline">{title}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <HiClock className="h-5 w-5 text-primary" />
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] uppercase tracking-wide text-muted">Time Remaining</span>
              <span className="font-mono text-sm font-semibold text-heading">{timeRemaining}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Avatar name={candidate.name} size="sm" />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold text-heading">{candidate.name}</span>
              <span className="text-xs text-muted">Candidate ID: {candidate.id}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
