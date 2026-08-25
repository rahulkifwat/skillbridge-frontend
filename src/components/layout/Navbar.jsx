"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiXMark, HiChevronDown } from "react-icons/hi2";
import BrandLogo from "@/components/common/BrandLogo";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useT } from "@/context/LanguageContext";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const t = useT();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <BrandLogo inverted />

        <nav className="hidden flex-1 items-center gap-4 xl:flex 2xl:gap-5">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.tKey}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.tKey)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 whitespace-nowrap border-b-2 py-1 text-[13px] font-medium transition-colors 2xl:text-sm ${
                    isActive(link.href)
                      ? "border-brand-bright text-white"
                      : "border-transparent text-white/75 hover:text-white"
                  }`}
                >
                  {t(link.tKey)}
                  <HiChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
                {openDropdown === link.tKey && (
                  <div className="absolute left-0 top-full w-56 rounded-lg border border-border bg-white p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.tKey}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-body hover:bg-brand-light hover:text-brand"
                      >
                        {t(child.tKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.tKey}
                href={link.href}
                className={`whitespace-nowrap border-b-2 py-1 text-[13px] font-medium transition-colors 2xl:text-sm ${
                  isActive(link.href)
                    ? "border-brand-bright text-white"
                    : "border-transparent text-white/75 hover:text-white"
                }`}
              >
                {t(link.tKey)}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            {t("common.logIn")}
          </Link>
          <Link
            href="/assessment"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            {t("common.startAssessment")}
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-white"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={t("nav.toggleMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-line bg-ink xl:hidden">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.tKey}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.tKey)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-ink-line pt-3">
              <Link
                href="/login"
                className="rounded-lg border border-white/25 px-4 py-2 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                {t("common.logIn")}
              </Link>
              <Link
                href="/assessment"
                className="rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                {t("common.startAssessment")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
