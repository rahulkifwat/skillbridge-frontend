"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { safeNextPath } from "@/lib/safeNextPath";

export default function RequireAuth({ children, fallbackPath = "/student" }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || user) return;
    const next = safeNextPath(pathname, fallbackPath);
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [fallbackPath, loading, pathname, router, user]);

  if (loading || !user) {
    return <div className="min-h-screen bg-surface" aria-busy="true" aria-label="Checking your session" />;
  }

  return children;
}
