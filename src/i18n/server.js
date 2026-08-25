import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, normalizeLocale } from "./config";
import { createTranslator } from "./translate";

// Server-side counterpart to useLanguage(), for `generateMetadata` and any
// server component that needs a translated string.
export async function getServerLocale() {
  const store = await cookies();
  return normalizeLocale(store.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE);
}

export async function getServerTranslator() {
  const locale = await getServerLocale();
  return { locale, t: createTranslator(locale) };
}
