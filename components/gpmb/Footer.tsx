"use client";

import type { Locale, Messages } from "@/lib/i18n";
import { navIds, scrollTo } from "@/lib/site-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ m, locale }: { m: Messages; locale: Locale }) {
  return (
    <footer className="border-t-[3px] border-transparent bg-background footer-gradient">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_.8fr_.9fr] lg:px-8">
        <div>
          <img src="/images/gpmb-logo.png" alt="GPMB, Lda" className="h-14 w-auto max-w-[230px] object-contain object-left" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{m.footer.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{m.footer.quickLinks}</p>
          <div className="mt-4 grid gap-2">
            {navIds.slice(0, 5).map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-fit cursor-pointer border-0 bg-transparent p-0 text-sm text-muted-foreground hover:text-primary"
              >
                {m.nav[id]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">{m.footer.contact}</p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>+258 87 06 002 56</p>
            <p>+258 84 28 741 44</p>
            <p>info@gpmlda.com</p>
            <p>globalprocurementmz@gmail.com</p>
            <LanguageSwitcher locale={locale} label={m.localeName} />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground lg:px-8">
          © {new Date().getFullYear()} GPMB, Lda. {m.footer.rights}
        </div>
      </div>
    </footer>
  );
}