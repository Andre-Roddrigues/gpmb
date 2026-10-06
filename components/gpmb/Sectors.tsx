"use client";

import { Factory } from "lucide-react";
import type { Messages } from "@/lib/i18n";
import { sectorIcons } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Sectors({ m }: { m: Messages }) {
  return (
    <section id="sectors" className="scroll-mt-0 border-y border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle title={m.sectors.eyebrow} intro={m.sectors.intro} />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
          {m.sectors.items.map((item, i) => {
            const I = sectorIcons[i] ?? Factory;
            return (
              <Reveal key={item}>
                <div className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-subtle transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-elegant md:min-h-[260px] md:p-7">
                  {/* Halo / gradiente no hover */}
                  <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Ícone em badge circular */}
                  <div className="relative z-10 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground md:size-16">
                    <I className="size-7 md:size-8" />
                  </div>

                  {/* Título + linha decorativa */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold leading-tight md:text-xl">
                      {item}
                    </h3>
                    <div className="mt-4 h-[3px] w-10 gradient-wing transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}