"use client";

import { useEffect, useRef, useState } from "react";
import { HiCheck, HiChevronDown, HiGlobeAlt } from "react-icons/hi2";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher({ variant = "dark" }) {
  const { locale, setLocale, locales, localeMeta, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const trigger =
    variant === "dark"
      ? "text-white/75 hover:text-white"
      : "text-body hover:text-heading";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t("language.change")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1 text-sm transition-colors ${trigger}`}
      >
        <HiGlobeAlt className="h-4 w-4" aria-hidden="true" />
        {localeMeta.short}
        <HiChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("language.label")}
          className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-border bg-white p-1 shadow-lg"
        >
          {locales.map((item) => {
            const active = item.code === locale;
            return (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  lang={item.code}
                  onClick={() => {
                    setLocale(item.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-brand-light font-semibold text-brand"
                      : "text-body hover:bg-brand-light hover:text-brand"
                  }`}
                >
                  {item.label}
                  {active && <HiCheck className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
