import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof pt;

export const messages: Record<Locale, Messages> = { pt, en };
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
