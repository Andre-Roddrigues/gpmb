"use client";

import type { Locale, Messages } from "@/lib/i18n";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
import { Sectors } from "./Sectors";
import { Process } from "./Process";
import { Partners } from "./Partners";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Floating } from "./Floating";
import { ServicesCard } from "./ServicesCard";

export function Site({ m, locale }: { m: Messages; locale: Locale }) {
  return (
    <>
      <Header m={m} locale={locale} />
      <main id="main">
        <Hero m={m} locale={locale} />
        <About m={m} />
        <ServicesCard m={m} locale={locale}/>
        <Sectors m={m} />
        <Process m={m} />
        <Partners m={m} />
        <Contact m={m} locale={locale} />
      </main>
      <Footer m={m} locale={locale} />
      <Floating m={m} />
    </>
  );
}