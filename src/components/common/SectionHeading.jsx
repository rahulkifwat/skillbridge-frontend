export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment =
    align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="text-sm font-semibold text-primary">{eyebrow}</span>}
      <h2 className="text-3xl font-bold text-heading sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-base text-body">{subtitle}</p>}
    </div>
  );
}
