import { getServerTranslator } from "@/i18n/server";
import AboutContent from "./AboutContent";

export async function generateMetadata() {
  const { t } = await getServerTranslator();
  return {
    title: t("about.meta.title"),
    description: t("about.meta.description"),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
