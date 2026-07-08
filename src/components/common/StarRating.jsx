import { HiStar } from "react-icons/hi2";

export default function StarRating({ count = 5, className = "" }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <HiStar key={i} className="h-4 w-4 text-amber" aria-hidden="true" />
      ))}
    </div>
  );
}
