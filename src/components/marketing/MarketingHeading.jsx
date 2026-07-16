// Centered section heading for the marketing site, with an optional
// right-aligned "View all" style action.
export default function MarketingHeading({ title, subtitle, action, align = "center", className = "" }) {
  if (action) {
    return (
      <div className={`flex items-end justify-between gap-4 ${className}`}>
        <div>
          <h2 className="text-2xl font-bold text-heading sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-body">{subtitle}</p>}
        </div>
        {action}
      </div>
    );
  }

  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      <h2 className="text-2xl font-bold text-heading sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-base text-body">{subtitle}</p>}
    </div>
  );
}
