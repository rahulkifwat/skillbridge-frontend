import { DEFAULT_LOCALE } from "./config";
import { getDictionary } from "./dictionaries";

function lookup(source, path) {
  return path.split(".").reduce((node, key) => (node == null ? undefined : node[key]), source);
}

// Replaces {name} style placeholders: t("hello", { name: "Ana" }).
function interpolate(template, vars) {
  if (!vars || typeof template !== "string") return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    vars[key] === undefined ? match : String(vars[key])
  );
}

/**
 * Builds a `t(key, vars)` for a locale. Missing keys fall back to the default
 * locale, then to the key itself, so a half-translated dictionary degrades to
 * English rather than blank UI.
 */
export function createTranslator(locale) {
  const dictionary = getDictionary(locale);
  const fallback = getDictionary(DEFAULT_LOCALE);

  return function t(key, vars) {
    const value = lookup(dictionary, key) ?? lookup(fallback, key);
    if (value === undefined || value === null) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing translation for "${key}" (${locale})`);
      }
      return key;
    }
    return interpolate(value, vars);
  };
}
