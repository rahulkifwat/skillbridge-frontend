import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { companies } from "@/data/content";

export default function TrustedBySection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-8">
        <h2 className="text-xl font-semibold text-heading">Trusted by Leading Companies</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {companies.map((company) => (
            <span key={company} className="text-lg font-bold text-muted">
              {company}
            </span>
          ))}
        </div>
        <Button href="/partners" variant="ghost" showArrow className="text-primary">
          View all partners
        </Button>
      </Container>
    </section>
  );
}
