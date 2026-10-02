"use client";

import type { Messages } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Process({ m }: { m: Messages }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle eyebrow={m.process.eyebrow} title={m.process.title} />
        </Reveal>
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div className="absolute left-[8%] right-[8%] top-6 hidden h-[3px] gradient-wing md:block" />
          {m.process.items.map((item, i) => (
            <Reveal key={item.title} className="relative">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground ring-8 ring-background">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}