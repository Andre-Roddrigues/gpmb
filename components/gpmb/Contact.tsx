"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Locale, Messages } from "@/lib/i18n";
import type { Icon } from "@/lib/site-utils";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type FormValues = {
  name: string;
  company?: string | undefined;
  email: string;
  phone?: string | undefined;
  subject: "quote" | "information" | "partnership" | "other";
  message: string;
  consent: boolean;
  website?: string | undefined;
};

export function Contact({ m, locale }: { m: Messages; locale: Locale }) {
  const schema = z.object({
    name: z.string().trim().min(2, m.contact.validation.name).max(100),
    company: z.string().max(120).optional(),
    email: z.string().trim().email(m.contact.validation.email).max(255),
    phone: z.string().max(40).optional(),
    subject: z.enum(["quote", "information", "partnership", "other"]),
    message: z.string().trim().min(10, m.contact.validation.message).max(2000),
    consent: z.boolean().refine((value) => value, { message: m.contact.validation.consent }),
    website: z.string().max(0).optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { consent: false } });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submit = async (data: FormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const field = "mt-2 h-11 rounded-lg bg-background";

  return (
    <section id="contact" className="scroll-mt-0 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionTitle eyebrow={m.contact.eyebrow} title={m.contact.title} intro={m.contact.intro} />
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <form onSubmit={handleSubmit(submit)} className="rounded-2xl border border-border bg-background p-6 shadow-subtle md:p-9" noValidate>
              <h3 className="text-xl font-semibold">{m.contact.formTitle}</h3>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  {m.contact.name}
                  <Input {...register("name")} className={field} />
                  <span className="field-error">{errors.name?.message}</span>
                </label>
                <label className="text-sm font-medium">
                  {m.contact.company} <span className="font-normal text-muted-foreground">({m.contact.optional})</span>
                  <Input {...register("company")} className={field} />
                </label>
                <label className="text-sm font-medium">
                  {m.contact.email}
                  <Input type="email" {...register("email")} className={field} />
                  <span className="field-error">{errors.email?.message}</span>
                </label>
                <label className="text-sm font-medium">
                  {m.contact.phone} <span className="font-normal text-muted-foreground">({m.contact.optional})</span>
                  <Input type="tel" {...register("phone")} className={field} />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium">
                {m.contact.subject}
                <Select value={watch("subject")} onValueChange={(v) => setValue("subject", v as FormValues["subject"], { shouldValidate: true })}>
                  <SelectTrigger className={field}>
                    <SelectValue placeholder={m.contact.subjectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(m.contact.subjects).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="field-error">{errors.subject?.message || (!watch("subject") ? undefined : null)}</span>
              </label>
              <label className="mt-5 block text-sm font-medium">
                {m.contact.message}
                <Textarea {...register("message")} rows={6} className="mt-2 resize-none rounded-lg bg-background" />
                <span className="field-error">{errors.message?.message}</span>
              </label>
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />
              <div className="mt-5 flex items-start gap-3">
                <Checkbox checked={watch("consent")} onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })} id="consent" />
                <label htmlFor="consent" className="text-sm leading-5 text-muted-foreground">
                  {m.contact.consent}
                </label>
              </div>
              <span className="field-error">{errors.consent?.message}</span>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" variant="cta" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? m.contact.sending : m.contact.send}
                  <ArrowRight />
                </Button>
                <p className="text-xs text-muted-foreground">{m.contact.privacy}</p>
              </div>
              {status !== "idle" && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className={`mt-5 flex items-center gap-2 text-sm font-medium ${
                    status === "success" ? "text-green-dark" : "text-destructive"
                  }`}
                >
                  {status === "success" && <CheckCircle2 className="size-4" />}
                  {status === "success" ? m.contact.success : m.contact.error}
                </motion.p>
              )}
            </form>
          </Reveal>
          <Reveal>
            <div className="space-y-7">
              <div className="rounded-2xl bg-ink p-7 text-ink-foreground md:p-9">
                {[
                  [MapPin, m.contact.addressLabel, "Av. Vlademir Lenine Nº 573, Bairro Coop, 1º Andar, Kampfumo, Maputo-Cidade"],
                  [Phone, m.contact.phoneLabel, "+258 84 28 741 44 | +258 84 28 741 44"],
                  [Mail, m.contact.emailsLabel, "info@gpmbmz.com\nglobalprocurementmz@gmail.com"],
                ].map(([I, l, v]) => {
                  const C = I as Icon;
                  return (
                    <div key={l as string} className="flex gap-4 border-b border-ink-border py-5 first:pt-0 last:border-0 last:pb-0">
                      <C className="mt-1 size-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[.12em] text-ink-muted">{l as string}</p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6">{v as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <iframe
                title={m.contact.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full rounded-2xl border border-border"
                src="https://www.google.com/maps?q=Av.%20Vladimir%20Lenine%20573%20Maputo&output=embed"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}