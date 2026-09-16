"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isSpanishAcademyUser, isSpanishBlockedPath, SPANISH_ACADEMY_HOME } from "@/lib/spanishSplit";

export default function SpanishSplitGuard({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const locked = isSpanishAcademyUser(user) && isSpanishBlockedPath(pathname);

  useEffect(() => {
    if (loading || !locked) return;
    router.replace(SPANISH_ACADEMY_HOME);
  }, [loading, locked, router]);

  if (locked) {
    return <div className="min-h-screen bg-surface" aria-busy="true" aria-label="Opening Spanish Academy" />;
  }

  return children;
}
