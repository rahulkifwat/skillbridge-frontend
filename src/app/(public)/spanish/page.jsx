import { getServerTranslator } from "@/i18n/server";
import SpanishAcademyContent from "./SpanishAcademyContent";

export async function generateMetadata() {
  const { t } = await getServerTranslator();
  return {
    title: t("spanish.meta.title"),
    description: t("spanish.meta.description"),
  };
}

export default function SpanishAcademyPage() {
  return <SpanishAcademyContent />;
}
