import { HiRocketLaunch } from "react-icons/hi2";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

export default function CtaBanner() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-10 text-white sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <HiRocketLaunch className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold">Ready to Build Your Future?</h2>
              <p className="text-sm text-white/80">
                Start with an assessment and get your personalized path to success.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <div className="flex gap-3">
              <Button href="/assessment" variant="outline" className="bg-white">
                Get Assessed
              </Button>
              <Button
                href="/signup"
                variant="ghost"
                className="border border-white/40 text-white hover:bg-white/10"
              >
                Start for Free
              </Button>
            </div>
            <span className="text-xs text-white/70">No credit card required</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
