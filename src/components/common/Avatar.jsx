const PALETTE = ["bg-primary", "bg-accent", "bg-navy-soft"];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ name, size = "md", index = 0, className = "" }) {
  const sizeClasses = size === "sm" ? "h-8 w-8 text-xs" : "h-12 w-12 text-sm";
  const color = PALETTE[index % PALETTE.length];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${color} font-semibold text-white ring-2 ring-white ${sizeClasses} ${className}`}
    >
      {initials(name)}
    </span>
  );
}
