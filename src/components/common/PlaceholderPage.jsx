import Container from "@/components/common/Container";

export default function PlaceholderPage({ title, description }) {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-3 py-20 text-center">
      <h1 className="text-3xl font-bold text-heading">{title}</h1>
      <p className="max-w-md text-sm text-body">{description}</p>
    </Container>
  );
}
