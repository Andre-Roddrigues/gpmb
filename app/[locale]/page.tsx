import { notFound } from "next/navigation";
import { Site } from "@/components/gpmb/Site";
import { isLocale, messages, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const m = messages[rawLocale];
  return {
    title: m.meta.title,
    description: m.meta.description,
    openGraph: { title: m.meta.title, description: m.meta.description, type: "website" },
    twitter: { card: "summary_large_image", title: m.meta.title, description: m.meta.description },
    alternates: {
      canonical: `/${rawLocale}`,
      languages: { pt: "/pt", en: "/en", "x-default": "/pt" },
    },
  };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  return <Site locale={locale} m={messages[locale]} />;
}
