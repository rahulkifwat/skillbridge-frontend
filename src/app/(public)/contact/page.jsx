import { getServerTranslator } from "@/i18n/server";
import ContactContent from "./ContactContent";

export async function generateMetadata() {
  const { t } = await getServerTranslator();
  return {
    title: t("contact.meta.title"),
    description: t("contact.meta.description"),
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
