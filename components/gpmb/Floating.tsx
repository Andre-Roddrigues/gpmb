"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Messages } from "@/lib/i18n";
import { scrollTo } from "@/lib/site-utils";

export function Floating({ m }: { m: Messages }) {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1000);
    const s = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", s, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", s);
    };
  }, []);

  const url = `https://wa.me/258842874144?text=${encodeURIComponent(m.floating.whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 md:right-6"
    >
      {top && (
        <Button variant="floatingTop" size="icon" onClick={() => scrollTo("home")} aria-label={m.floating.top} title={m.floating.top}>
          <ArrowUp />
        </Button>
      )}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={m.floating.whatsapp}
        title={m.floating.whatsapp}
        className="whatsapp-button group flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MessageCircle className="size-6" />
        <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-medium text-ink-foreground opacity-0 transition group-hover:opacity-100 group-focus:opacity-100">
          {m.floating.whatsapp}
        </span>
      </a>
    </motion.div>
  );
}