import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-hover hover:border-primary-hover",
  outline:
    "bg-white text-primary border border-primary/30 hover:bg-primary-light",
  ghost:
    "bg-transparent text-heading border border-transparent hover:bg-surface",
};

export default function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className = "",
  type = "button",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        {showArrow && <HiArrowRight aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
      {showArrow && <HiArrowRight aria-hidden="true" />}
    </button>
  );
}
