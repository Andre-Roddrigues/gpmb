"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ServiceDetail = {
  title: string;
  description: string;
  image: string;
  longDescription?: string;
  features?: string[];
};

export function ServiceModal({
  open,
  service,
  onClose,
  onRequestQuote,
  labels,
}: {
  open: boolean;
  service: ServiceDetail | null;
  onClose: () => void;
  onRequestQuote: () => void;
  labels: {
    close: string;
    features: string;
    quote: string;
  };
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Fecha com ESC + bloqueia scroll do body
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    // Guarda o valor original para restaurar corretamente
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  // Sempre que muda de serviço, faz scroll do conteúdo para o topo
  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [open, service?.title]);

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-elegant"
          >
            {/* Imagem de topo */}
            <div className="relative aspect-[16/7] w-full shrink-0 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

              {/* Botão fechar */}
              <button
                onClick={onClose}
                aria-label={labels.close}
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/95 text-foreground shadow-subtle transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" />
              </button>

              {/* Título + descrição sobrepostos */}
              <div className="absolute inset-x-6 bottom-5">
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-white/85">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Conteúdo (scroll interno) */}
            <div ref={contentRef} className="flex-1 overflow-y-auto p-6 sm:p-8">
              {service.longDescription && (
                <p className="text-base leading-7 text-muted-foreground">
                  {service.longDescription}
                </p>
              )}

              {service.features && service.features.length > 0 && (
                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">
                    {labels.features}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Rodapé com CTA */}
            <div className="flex flex-col gap-3 border-t border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="text-xs text-muted-foreground">{service.title}</p>
              <div className="flex gap-3">
                <Button variant="brandOutline" onClick={onClose}>
                  {labels.close}
                </Button>
                <Button variant="cta" onClick={onRequestQuote}>
                  {labels.quote}
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}