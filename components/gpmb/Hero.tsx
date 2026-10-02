"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale, Messages } from "@/lib/i18n";
import { scrollTo } from "@/lib/site-utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const slides = [
  "/images/2151307732.jpg",
  "/images/2151307744.jpg",
  "/images/132168.jpg",
];

export function Hero({ m, locale }: { m: Messages; locale: Locale }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      id="hero"
      className="relative flex h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Slider de imagens de fundo */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={index}
            src={slides[index]}
            alt=""
            width={1920}
            height={1080}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Gradiente sobreposto */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <motion.div
          variants={fadeInUp}
          className="mx-auto max-w-4xl text-center text-white"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {m.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
          >
            {m.hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button variant="cta" onClick={() => scrollTo("contact")}>
              {m.nav.quote}
              <ArrowRight />
            </Button>
            <Button
              variant="brandOutline"
              onClick={() => scrollTo("services")}
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              {m.hero.services}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}