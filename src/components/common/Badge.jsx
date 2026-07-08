export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary ${className}`}
    >
      {children}
    </span>
  );
}
