"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_MAX_AGE,
  getLocaleMeta,
  normalizeLocale,
} from "@/i18n/config";
import { createTranslator } from "@/i18n/translate";

const LanguageContext = createContext(null);

function writeLocaleCookie(locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_MAX_AGE}; samesite=lax`;
}

/**
 * Holds the active language for the whole app.
 *
 * The locale lives in a cookie rather than the URL, so every existing route
 * keeps its path (/about stays /about in both languages). The root layout reads
 * the cookie on the server and passes it in as `initialLocale`, which means the
 * first paint is already in the right language — no English flash.
 */
export function LanguageProvider({ initialLocale = DEFAULT_LOCALE, children }) {
  const [locale, setLocaleState] = useState(() => normalizeLocale(initialLocale));

  const setLocale = useCallback((next) => {
    const normalized = normalizeLocale(next);
    setLocaleState(normalized);
    writeLocaleCookie(normalized);
  }, []);

  // Keep <html lang> in step so screen readers and browser translation
  // heuristics see the language the user actually picked.
  useEffect(() => {
    const meta = getLocaleMeta(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      locales: LOCALES,
      localeMeta: getLocaleMeta(locale),
      t: createTranslator(locale),
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside a LanguageProvider");
  return context;
}

// Shorthand for components that only need the translate function.
export function useT() {
  return useLanguage().t;
}
