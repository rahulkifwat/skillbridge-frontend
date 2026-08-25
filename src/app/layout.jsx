import { cookies } from "next/headers";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DEFAULT_LOCALE, LOCALE_COOKIE, getLocaleMeta, normalizeLocale } from "@/i18n/config";
import "./globals.css";

export const metadata = {
  title: "Skill Bridge",
  description: "Skill Bridge",
};

export default async function RootLayout({ children }) {
  // Reading the locale cookie here means the server renders the page in the
  // chosen language on the first paint, instead of flashing English.
  const store = await cookies();
  const locale = normalizeLocale(store.get(LOCALE_COOKIE)?.value || DEFAULT_LOCALE);

  return (
    <html
      lang={locale}
      dir={getLocaleMeta(locale).dir}
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLocale={locale}>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
