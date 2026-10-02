"use client";

import { Factory } from "lucide-react";
import type { Messages } from "@/lib/i18n";
import { sectorIcons } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { SectionEyebrow } from "./SectionEyebrown";

export function Sectors({ m }: { m: Messages }) {
  return (
    <section id="sectors" className="scroll-mt-0 border-y border-border bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle  title={m.sectors.eyebrow} intro={m.sectors.intro} />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5">
          {m.sectors.items.map((item, i) => {
            const I = sectorIcons[i] ?? Factory;
            return (
              <Reveal key={item} className="bg-background">
                <div className="flex min-h-40 flex-col justify-between p-5 md:min-h-52 md:p-7">
                  <I className="size-7 text-primary" />
                  <h3 className="text-base font-semibold md:text-lg">{item}</h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}