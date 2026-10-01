import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional(),
  subject: z.enum(["quote", "information", "partnership", "other"]),
  message: z.string().trim().min(10).max(2000),
  locale: z.enum(["pt", "en"]),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const source = `${request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown"}:${parsed.data.email.toLowerCase()}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  const fingerprint = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { count } = await supabaseAdmin.from("contact_submissions").select("id", { count: "exact", head: true }).eq("request_fingerprint", fingerprint).gte("created_at", since);
  if ((count ?? 0) >= 5) return NextResponse.json({ ok: false }, { status: 429 });

  const { website: _honeypot, ...submission } = parsed.data;
  const { error } = await supabaseAdmin.from("contact_submissions").insert({
    ...submission,
    company: submission.company || null,
    phone: submission.phone || null,
    request_fingerprint: fingerprint,
  });
  if (error) return NextResponse.json({ ok: false }, { status: 500 });
  return NextResponse.json({ ok: true });
}
