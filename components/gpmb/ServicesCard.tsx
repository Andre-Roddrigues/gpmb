"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import type { Messages } from "@/lib/i18n";
import { serviceIcons } from "@/lib/site-utils";
import { SectionTitle } from "./SectionTitle";
import { ServiceModal, type ServiceDetail } from "./ServiceModal";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const serviceImages: Record<number, string> = {
  0: "/images/escritorio.jpg",
  1: "/images/electrico.jpg",
  2: "/images/equipamentodeprotecao.jpg",
  3: "/images/servicesgrafica.jpg",
  4: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1024&q=80",
  5: "/images/serviceselevacao.jpg",
  6: "/images/valvulas.jpg",
  7: "/images/aluminio.jpg",
  8: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1024&q=80",
  9: "/images/correia.jpg",
  10: "/images/132168.jpg",
  11: "/images/hidraulico.jpg",
};

const serviceDetails: Record<number, { long: string; features: string[] }> = {
  0: {
    long: "Fornecemos consumíveis e equipamentos para espaços de trabalho funcionais, desde papelaria básica a mobiliário de escritório, com entregas regulares e stocks geridos.",
    features: [
      "Papelaria e consumíveis",
      "Mobiliário de escritório",
      "Equipamento de impressão",
      "Stocks geridos e reposição automática",
    ],
  },
  1: {
    long: "Componentes eléctricos para infra-estruturas industriais, comerciais e domésticas. Trabalhamos com marcas certificadas (ABB, Siemens, Schneider) e fornecemos apoio técnico na selecção.",
    features: [
      "Disjuntores e quadros eléctricos",
      "Cabos e acessórios",
      "Transformadores e fontes",
      "Sensores e equipamento pneumático",
    ],
  },
  2: {
    long: "Soluções de segurança e protecção para diferentes sectores, com equipamento certificado e conformidade com normas internacionais.",
    features: [
      "Capacetes, óculos e luvas",
      "Vestuário de protecção",
      "Máscaras e respiradores",
      "Calçado de segurança",
    ],
  },
  3: {
    long: "Materiais de comunicação visual e produção gráfica para empresas e indústria, com suporte em pré-impressão e acabamentos.",
    features: [
      "Papel e substratos",
      "Tintas e consumíveis",
      "Lonas e vinis",
      "Materiais de acabamento",
    ],
  },
  4: {
    long: "Equipamentos para processos de soldadura industriais, com formação e assistência técnica incluídas.",
    features: [
      "Soldadores SMAW, TIG, MIG",
      "Multi-processo e avançados",
      "Consumíveis de soldadura",
      "Assistência técnica",
    ],
  },
  5: {
    long: "Soluções de alto desempenho orientadas à segurança, para operações de elevação em indústria, portos e offshore.",
    features: [
      "Cabos e lingas",
      "Macacos e cilindros",
      "Sistemas de elevação",
      "Inspecção e certificação",
    ],
  },
  6: {
    long: "Equipamentos inspeccionados para aplicações industriais, com testes antes da entrega para minimizar tempos de paragem.",
    features: [
      "Bombas centrífugas e de deslocamento",
      "Válvulas de controlo",
      "Estações de bombagem",
      "Separadores óleo/água",
    ],
  },
  7: {
    long: "Metais e perfis resistentes à corrosão, certificados ISO e SABS, para aplicações exigentes.",
    features: [
      "Aço inoxidável",
      "Duplex stainless",
      "Alumínio e perfis",
      "Chapas e tubos",
    ],
  },
  8: {
    long: "Material leve, durável e resistente a químicos, ideal para guias de desgaste, tanques e aplicações industriais.",
    features: [
      "Chapas de HDPE",
      "Guias de desgaste",
      "Tanques e ductos",
      "Corte e moldagem",
    ],
  },
  9: {
    long: "Componentes e apoio para sistemas de transporte, com garantia de qualidade e suporte pós-venda.",
    features: [
      "Correias transportadoras",
      "Roletes e tambores",
      "Borrachas técnicas",
      "Serviços de manutenção",
    ],
  },
  10: {
    long: "Computadores e equipamentos robustos para ambientes industriais, com configurações personalizadas.",
    features: [
      "Computadores industriais",
      "Impressoras e plotadores",
      "Teclados e periféricos",
      "Switches e cabos de rede",
    ],
  },
  11: {
    long: "Peças e ferramentas para manutenção e operação, com apoio técnico na identificação de componentes.",
    features: [
      "Peças hidráulicas",
      "Peças mecânicas",
      "Ferramentas de manutenção",
      "Apoio técnico",
    ],
  },
};

export function ServicesCard({ m, locale }: { m: Messages; locale: "pt" | "en" }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected: ServiceDetail | null =
    selectedIndex === null
      ? null
      : {
          title: m.services.items[selectedIndex].title,
          description: m.services.items[selectedIndex].description,
          image: serviceImages[selectedIndex] ?? serviceImages[0],
          longDescription: serviceDetails[selectedIndex]?.long,
          features: serviceDetails[selectedIndex]?.features,
        };

  const handleQuote = () => {
    setSelectedIndex(null);
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <>
      <section id="services" className="scroll-mt-0 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft} className="max-w-3xl">
              <SectionTitle
                title={m.services.eyebrow}
                intro={m.services.intro}
              />
            </motion.div>

            {/* Grid de cards — cada card tem o seu próprio whileInView */}
            <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {m.services.items.map((s, i) => {
                const Icon = serviceIcons[i] ?? Car;
                return (
                  <motion.div
                    key={s.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-background text-left shadow-subtle transition-smooth hover:shadow-elegant"
                    >
                      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                        <img
                          src={serviceImages[i] ?? serviceImages[0]}
                          alt={s.title}
                          loading="lazy"
                          width={1024}
                          height={768}
                          className="h-full w-full object-cover transition-smooth group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                        <div className="absolute left-4 top-4 grid size-12 place-items-center rounded-xl bg-white/95 shadow-subtle backdrop-blur">
                          <Icon className="size-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-display text-xl font-bold leading-snug">
                          {s.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-muted-foreground">
                          {s.description}
                        </p>
                        <span className="mt-auto inline-flex items-center pt-4 text-sm font-semibold text-primary transition-smooth group-hover:text-primary-dark">
                          {locale === "pt" ? "Saber mais" : "Learn more"}
                          <ArrowRight className="ml-1 size-4 transition-smooth group-hover:translate-x-1" />
                        </span>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceModal
        open={selectedIndex !== null}
        service={selected}
        onClose={() => setSelectedIndex(null)}
        onRequestQuote={handleQuote}
        labels={{
          close: locale === "pt" ? "Fechar" : "Close",
          features: locale === "pt" ? "O que fornecemos" : "What we supply",
          quote: locale === "pt" ? "Pedir cotação" : "Request a quote",
        }}
      />
    </>
  );
}