"use client";

import { Download, Eye, HandHeart, ShieldCheck, Target } from "lucide-react";
import type { Messages } from "@/lib/i18n";
import { valueIcons, type Icon } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function About({ m }: { m: Messages }) {
  return (
    <section id="about" className="scroll-mt-0 bg-surface py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <Reveal>
          <SectionTitle title={m.about.eyebrow} />
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-12 md:gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {m.about.body}
            </p>

            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
              {[
                [Target, m.about.missionTitle, m.about.mission],
                [Eye, m.about.visionTitle, m.about.vision],
              ].map(([I, t, b]) => {
                const C = I as Icon;
                return (
                  <article
                    key={t as string}
                    className="rounded-xl border border-border bg-background p-5 sm:p-6"
                  >
                    <C className="size-7 text-primary" />
                    <h3 className="mt-4 text-lg font-semibold sm:mt-5 sm:text-xl">
                      {t as string}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {b as string}
                    </p>
                  </article>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-border bg-background p-5 sm:p-7 md:p-9">
              <p className="section-eyebrow">{m.about.valuesTitle}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {m.about.values.map((value, i) => {
                  const I = valueIcons[i] ?? ShieldCheck;
                  return (
                    <div
                      key={value}
                      className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium"
                    >
                      <I className="size-5 shrink-0 text-primary" />
                      {value}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-border pt-7">
                <div className="flex items-start gap-3 sm:gap-4">
                  <HandHeart className="mt-1 size-6 shrink-0 text-orange sm:size-7" />
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {m.about.commitmentTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {m.about.commitment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Botões de download — coluna em mobile, linha em sm+ */}
        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <a
            href="/docs/GPMB-Company-Profile.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary-dark sm:mt-7 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4 shrink-0" />
            <span>{m.about.downloadCompanyProfile}</span>
          </a>
          <a
            href="/docs/GPMB-Reseller-Letter.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary-dark sm:mt-7 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4 shrink-0" />
            <span>{m.about.downloadResellerLetter}</span>
          </a>
          <a
            href="/docs/RAILO-Letter-of-Cooperation-Support.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary-dark sm:mt-7 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4 shrink-0" />
            <span>{m.about.downloadRAILOLetter}</span>
          </a>
          <a
            href="/docs/RESELLER-FOR-BEYOND-VALVES-PRODUCTS.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary-dark sm:mt-7 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
            aria-label={m.about.downloadAria}
          >
            <Download className="size-4 shrink-0" />
            <span>{m.about.downloadValesProducts}</span>
          </a>
        </div>
      </div>
    </section>
  );
}