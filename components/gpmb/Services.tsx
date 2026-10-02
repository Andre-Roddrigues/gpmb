"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Messages } from "@/lib/i18n";
import { serviceIcons } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Services({ m }: { m: Messages }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? m.services.items : m.services.items.slice(0, 4);

  return (
    <section id="services" className="scroll-mt-0 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle eyebrow={m.services.eyebrow} title={m.services.title} intro={m.services.intro} />
        </Reveal>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">
          {m.services.mainLabel}
        </p>
        <motion.div layout className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item, i) => {
            const I = serviceIcons[i] ?? Package;
            return (
              <motion.article
                layout
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2) }}
                className={`service-card group rounded-xl border bg-background p-6 ${i < 4 ? "border-border" : "border-border/80"}`}
              >
                <I className="size-7 text-primary" />
                <h3 className="mt-7 text-lg font-semibold leading-6">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <div className="service-line mt-6 h-[3px] w-0 gradient-wing transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>
        <div className="mt-8 flex justify-center">
          <Button variant="brandOutline" onClick={() => setExpanded((v) => !v)}>
            {expanded ? m.services.showLess : m.services.showMore}
            <ChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
    </section>
  );
}