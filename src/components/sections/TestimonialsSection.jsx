import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import { testimonials } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading title="Success Stories from Our Learners" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-body">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3">
                <Avatar name={testimonial.name} index={i} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-heading">{testimonial.name}</span>
                  <span className="text-xs text-muted">{testimonial.role}</span>
                </div>
                <span className="ml-auto text-xs font-semibold text-primary">
                  Hired at {testimonial.company}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button href="/success-stories" variant="ghost" showArrow className="text-primary">
          Read more stories
        </Button>
      </Container>
    </section>
  );
}
