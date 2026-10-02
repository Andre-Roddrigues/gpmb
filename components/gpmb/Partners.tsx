"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Messages } from "@/lib/i18n";
import { partners } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { SectionEyebrow } from "./SectionEyebrown";

export function Partners({ m }: { m: Messages }) {
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const list = useMemo(() => [...partners, ...partners], []);

  const nudge = (dir: number) => track.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <section id="partners" className="scroll-mt-0 overflow-hidden bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <SectionEyebrow eyebrow={m.partners.eyebrow} title={m.partners.title} intro={m.partners.intro} />
            <div className="flex gap-2">
              <Button variant="darkGhost" size="icon" onClick={() => nudge(-1)} aria-label={m.partners.previous}>
                <ChevronLeft />
              </Button>
              <Button variant="darkGhost" size="icon" onClick={() => setPaused((v) => !v)} aria-label={paused ? m.partners.play : m.partners.pause}>
                {paused ? <Play /> : <Pause />}
              </Button>
              <Button variant="darkGhost" size="icon" onClick={() => nudge(1)} aria-label={m.partners.next}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
      <div role="region" aria-label={m.partners.region} className="mt-12">
        <div ref={track} className="marquee-viewport overflow-x-auto focus-within:overflow-x-auto">
          <motion.div
            className="marquee-track flex w-max gap-4 px-5 lg:px-8"
            animate={!paused && !reduced ? { x: ["0%", "-50%"] } : false}
            transition={{ duration: 48, ease: "linear", repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
          >
            {list.map((p, i) => (
              <div
                key={`${p[0]}-${i}`}
                title={p[1]}
                className="flex h-28 w-56 shrink-0 flex-col justify-center rounded-lg border border-ink-border bg-ink-surface px-5 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 focus-within:opacity-100"
              >
                <span className="font-display font-semibold text-ink-foreground">{p[0]}</span>
                <span className=" line-clamp-2 text-xs text-ink-muted">{p[1]}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}