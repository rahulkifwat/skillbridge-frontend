import { HiPlay } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StarRating from "@/components/common/StarRating";
import Avatar from "@/components/common/Avatar";

const LEARNERS = ["Ava N.", "Marcus T.", "Priya K."];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Badge>The #1 EdTech Platform for Future-Ready Careers</Badge>
          <h1 className="text-4xl font-extrabold leading-tight text-heading sm:text-5xl">
            Future Skills.
            <br />
            <span className="text-primary">Real Practice.</span>
            <br />
            Real Results.
          </h1>
          <p className="max-w-md text-base text-body">
            SkillBridge EdTech connects learners to in-demand skills, real-world
            practice, and verified job opportunities.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/assessment" variant="primary" showArrow>
              Get Assessed
            </Button>
            <Button href="/learning-academy" variant="outline" showArrow>
              Start Learning
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {LEARNERS.map((name, i) => (
                <Avatar key={name} name={name} size="sm" index={i} />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <StarRating />
              <span className="text-xs text-muted">
                Join 100,000+ learners building their future
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-heading">
                Welcome from Our Director
              </span>
            </div>
            <div className="relative aspect-video bg-linear-to-br from-navy to-navy-soft">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play welcome video"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
                >
                  <HiPlay className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <span className="absolute left-4 top-4 text-sm font-semibold text-white/80">
                SkillBridge
              </span>
            </div>
            <div className="px-4 py-3">
              <div className="h-1 w-full rounded-full bg-surface-alt">
                <div className="h-1 w-1/4 rounded-full bg-primary" />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted">
                <span>0:00 / 1:45</span>
                <span>SkillBridge EdTech</span>
              </div>
            </div>
          </div>
          <blockquote className="text-center text-sm italic text-primary">
            &ldquo;Our mission is simple: bridge the gap between learning and
            real-world success through technology, practice, and
            opportunity.&rdquo;
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
