"use client";

import Link from "next/link";
import { Globe2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const other = locale === "pt" ? "en" : "pt";
  const change = () => {
    document.cookie = `gpmb_locale=${other};path=/;max-age=31536000;samesite=lax`;
  };
  return (
    <Link
      href={`/${other}`}
      onClick={change}
      aria-label={`${label}: ${other.toUpperCase()}`}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-xs font-semibold tracking-[.08em] text-foreground transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Globe2 className="size-4 text-primary" />
      <span className={locale === "pt" ? "text-primary" : "text-muted-foreground"}>PT</span>
      <span aria-hidden="true">|</span>
      <span className={locale === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
    </Link>
  );
}