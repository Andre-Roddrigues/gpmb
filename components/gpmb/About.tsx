"use client";

import { Download, Eye, HandHeart, ShieldCheck, Target } from "lucide-react";
import type { Messages } from "@/lib/i18n";
import { valueIcons, type Icon } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function About({ m }: { m: Messages }) {
  return (
    <section id="about" className="scroll-mt-0 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle title={m.about.eyebrow} />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="text-lg leading-8 text-muted-foreground">{m.about.body}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                [Target, m.about.missionTitle, m.about.mission],
                [Eye, m.about.visionTitle, m.about.vision],
              ].map(([I, t, b]) => {
                const C = I as Icon;
                return (
                  <article key={t as string} className="rounded-xl border border-border bg-background p-6">
                    <C className="size-7 text-primary" />
                    <h3 className="mt-5 text-xl font-semibold">{t as string}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{b as string}</p>
                  </article>
                );
              })}

            </div>

          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-border bg-background p-7 md:p-9">
              <p className="section-eyebrow">{m.about.valuesTitle}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {m.about.values.map((value, i) => {
                  const I = valueIcons[i] ?? ShieldCheck;
                  return (
                    <div key={value} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium">
                      <I className="size-5 text-primary" />
                      {value}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 border-t border-border pt-7">
                <div className="flex items-start gap-4">
                  <HandHeart className="mt-1 size-7 shrink-0 text-orange" />
                  <div>
                    <h3 className="text-xl font-semibold">{m.about.commitmentTitle}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{m.about.commitment}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 justify-center w-full flex gap-4">
          <a
            href="/docs/GPMB-Company-Profile.pdf"
            download
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4" />
            {m.about.downloadCompanyProfile}
          </a>
          <a
            href="/docs/GPMB-Reseller-Letter.pdf"
            download
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4" />
            {m.about.downloadResellerLetter}
          </a>
          <a
            href="/docs/RAILO-Letter-of-Cooperation-Support.pdf"
            download
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4" />
            {m.about.downloadRAILOLetter}
          </a>
          <a
            href="/docs/RESELLER-FOR-BEYOND-VALVES-PRODUCTS.pdf"
            download
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4" />
            {m.about.downloadValesProducts}
          </a>
        </div>
      </div>
    </section>
  );
}