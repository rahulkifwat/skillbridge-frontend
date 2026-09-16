"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { SPANISH_DASHBOARD_PATH } from "@/lib/spanishAcademyPaths";

export default function SpanishAcademyShell({ children, eyebrow = "Spanish Academy" }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-navy text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mint">{eyebrow}</p>
            <p className="text-sm font-bold">SkillBridge Spanish Academy</p>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/spanish-academy" className="text-white/70 hover:text-white">
              Academy home
            </Link>
            <Link href={SPANISH_DASHBOARD_PATH} className="text-white/70 hover:text-white">
              Dashboard
            </Link>
            {user ? (
              <button type="button" onClick={() => logout()} className="text-white/70 hover:text-white">
                Log out
              </button>
            ) : null}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
