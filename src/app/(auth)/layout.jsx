import Link from "next/link";
import LogoMark from "@/components/common/LogoMark";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-4 py-12">
      <Link href="/">
        <LogoMark />
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
