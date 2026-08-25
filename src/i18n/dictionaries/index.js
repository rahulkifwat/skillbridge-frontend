import en from "./en";
import es from "./es";
import { DEFAULT_LOCALE, normalizeLocale } from "../config";

// Every dictionary is bundled. With two languages that is cheap and keeps the
// switch instant; if the set grows past a handful, swap this for dynamic
// import() keyed on the locale code.
export const dictionaries = { en, es };

export function getDictionary(locale) {
  return dictionaries[normalizeLocale(locale)] || dictionaries[DEFAULT_LOCALE];
}

export { DEFAULT_LOCALE };
