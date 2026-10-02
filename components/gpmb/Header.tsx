"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale, Messages } from "@/lib/i18n";
import { navIds, scrollTo, type NavId } from "@/lib/site-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ m, locale }: { m: Messages; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavId>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as NavId);
        }),
      { rootMargin: "-30% 0px -60%", threshold: 0.01 }
    );
    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: NavId) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-header backdrop-blur-xl" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <a href="#main" className="skip-link">
        {m.nav.skip}
      </a>
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <button
          onClick={() => go("home")}
          className="cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={m.nav.home}
        >
          <img
            src="/images/gpmb-logo.png"
            alt="GPMB, Lda"
            className="h-12 w-auto max-w-[210px] object-contain object-left"
          />
        </button>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {navIds.map((id) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`cursor-pointer border-0 bg-transparent text-sm font-medium transition ${
                active === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.nav[id]}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher locale={locale} label={m.localeName} />
          <Button variant="cta" onClick={() => go("contact")}>
            {m.nav.quote}
            <ArrowRight />
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher locale={locale} label={m.localeName} />
          <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label={open ? m.nav.menuClose : m.nav.menuOpen}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <div className="h-[3px]" />
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden lg:hidden">
        <nav className="space-y-1 px-5 py-5">
          {navIds.map((id) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="flex w-full cursor-pointer rounded-md border-0 bg-transparent px-3 py-3 text-left text-sm font-medium text-foreground hover:bg-surface"
            >
              {m.nav[id]}
            </button>
          ))}
          <Button variant="cta" className="mt-3 w-full" onClick={() => go("contact")}>
            {m.nav.quote}
            <ArrowRight />
          </Button>
        </nav>
      </motion.div>
    </header>
  );
}