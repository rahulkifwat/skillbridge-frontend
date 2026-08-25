// Central list of languages the site ships with. Adding a language means:
//   1. add an entry here,
//   2. add `src/i18n/dictionaries/<code>.js`,
//   3. register it in `src/i18n/dictionaries/index.js`.
// Nothing else in the app needs to change.
export const LOCALES = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", dir: "ltr" },
];

export const DEFAULT_LOCALE = "en";

// Read on the server in the root layout and written by the language switcher,
// so the choice survives reloads without putting a prefix in every URL.
export const LOCALE_COOKIE = "sb_locale";
export const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

export function isSupportedLocale(code) {
  return LOCALES.some((locale) => locale.code === code);
}

export function normalizeLocale(code) {
  if (!code) return DEFAULT_LOCALE;
  const lower = String(code).toLowerCase();
  if (isSupportedLocale(lower)) return lower;
  // Accept regional tags such as "es-CO" or "en-US".
  const base = lower.split("-")[0];
  return isSupportedLocale(base) ? base : DEFAULT_LOCALE;
}

export function getLocaleMeta(code) {
  return LOCALES.find((locale) => locale.code === code) || LOCALES[0];
}
