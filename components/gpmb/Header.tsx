"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale, Messages } from "@/lib/i18n";
import { navIds, type NavId } from "@/lib/site-utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ m, locale }: { m: Messages; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavId>("home");

  /* ============ Scroll do header ============ */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ============ Active section ============ */
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

  /* ============ Bloquear scroll quando menu aberto ============ */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  /* ============ Fechar menu com ESC ============ */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ============ Navegação ============ */
  const go = (id: NavId) => {
    setOpen(false);

    // Pequeno delay para o menu mobile fechar e libertar o scroll
    setTimeout(() => {
      if (id === "home") {
        // Volta ao topo absoluto
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-header backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <a href="#main" className="skip-link">
          {m.nav.skip}
        </a>

        <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-5 lg:px-8">
          {/* ============ Logo ============ */}
          <button
            onClick={() => go("home")}
            className="flex cursor-pointer items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={m.nav.home}
          >
            <img
              src="/images/gpmb-logo.png"
              alt="GPMB, Lda"
              className="h-10 w-auto max-w-[160px] object-contain object-left sm:h-12 sm:max-w-[210px]"
            />
          </button>

          {/* ============ Nav desktop ============ */}
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {navIds.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`cursor-pointer border-0 bg-transparent text-sm font-medium transition ${
                  active === id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.nav[id]}
              </button>
            ))}
          </nav>

          {/* ============ Ações desktop ============ */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} label={m.localeName} />
            <Button variant="cta" onClick={() => go("contact")}>
              {m.nav.quote}
              <ArrowRight />
            </Button>
          </div>

          {/* ============ Ações mobile ============ */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <LanguageSwitcher locale={locale} label={m.localeName} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? m.nav.menuClose : m.nav.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-md border-0 bg-transparent text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="h-[3px]" />
      </header>

      {/* ============ Overlay + Menu mobile ============ */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 top-[67px] z-40 bg-black/40 backdrop-blur-sm lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <motion.nav
        id="mobile-menu"
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed inset-x-0 top-[67px] z-40 overflow-hidden bg-background shadow-header lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="space-y-1 px-4 py-5 sm:px-5">
          {navIds.map((id) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border-0 px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-transparent text-foreground hover:bg-surface"
                }`}
              >
                <span>{m.nav[id]}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}

          <Button
            variant="cta"
            className="mt-4 w-full"
            onClick={() => go("contact")}
          >
            {m.nav.quote}
            <ArrowRight />
          </Button>
        </div>
      </motion.nav>
    </>
  );
}