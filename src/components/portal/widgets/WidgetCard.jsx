// Titled dashboard card with an optional right-side action ("View All").
export default function WidgetCard({ title, action, right, className = "", children }) {
  return (
    <section className={`rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-sm ${className}`}>
      {(title || action || right) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-semibold text-heading">{title}</h2>}
          {right}
          {action && (
            <button type="button" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              {action}
            </button>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
