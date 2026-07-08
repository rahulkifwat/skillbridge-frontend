import { HiCheckCircle, HiOutlineComputerDesktop } from "react-icons/hi2";
import Container from "@/components/common/Container";
import { learnByDoingPoints } from "@/data/content";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.85;

export default function LearnByDoingSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-navy p-8 text-white sm:p-10 lg:grid-cols-[auto_auto_1fr] lg:gap-12">
          <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-navy-soft lg:flex">
            <HiOutlineComputerDesktop className="h-12 w-12 text-primary" aria-hidden="true" />
          </div>

          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-navy-soft">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="var(--color-navy-soft)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - PROGRESS)}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">85%</span>
              <span className="text-[10px] text-white/70">of training</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold">Learn by Doing</h2>
              <p className="text-sm font-semibold text-accent">
                85% Simulation-Based Learning
              </p>
            </div>
            <p className="max-w-xl text-sm text-white/80">
              We believe the best way to learn is by doing. Our platform uses
              real-world simulations so you can practice, make decisions, and
              build confidence before stepping into the job.
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {learnByDoingPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-white/90">
                  <HiCheckCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
