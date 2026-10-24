"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { ArrowRight } from "@/components/icons";

const contactSchema = z.object({
  name: z.string().min(2, "Ad soyad zorunlu"),
  phone: z.string().min(10, "Geçerli telefon girin").regex(/^[+\d\s()-]{10,}$/, "Sadece rakam"),
  email: z.string().email("Geçerli e-posta girin").optional().or(z.literal("")),
  message: z.string().min(8, "Mesaj kısa görünüyor"),
});

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const e2: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        e2[k] = issue.message;
      }
      setErrors(e2);
      setState("idle");
      return;
    }

    // No backend yet — simulate success. Real wiring routes through /api/teklif or a mailer.
    await new Promise((r) => setTimeout(r, 700));
    setState("sent");
  }

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/40 bg-cream-raised p-8 md:p-10"
      >
        <CheckmarkDraw />
        <h3 className="text-display-md font-editorial text-ink-strong leading-tight mt-6">
          Mesajınız bize ulaştı.
        </h3>
        <p className="text-[15.5px] text-ink-muted mt-3">
          En kısa sürede size dönüyoruz. Acil bir durum varsa telefonumuzdan ulaşabilirsiniz.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="Adınız Soyadınız" name="name" error={errors.name} />
      <Field label="Telefon" name="phone" type="tel" error={errors.phone} placeholder="0 5__ ___ __ __" tabular />
      <Field label="E-posta (opsiyonel)" name="email" type="email" error={errors.email} />
      <FieldArea label="Mesajınız" name="message" error={errors.message} />

      <button
        type="submit"
        disabled={state === "sending"}
        className="group inline-flex items-center gap-2 rounded-xl bg-ink-strong text-cream-base px-7 py-4 font-medium hover:bg-ink transition-colors disabled:opacity-60"
      >
        {state === "sending" ? "Gönderiliyor…" : "Mesajı gönder"}
        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="text-[13.5px] text-ink-strong"
          >
            Şu an gönderemedik. Lütfen birazdan tekrar deneyin veya bizi arayın.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  tabular,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  tabular?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] uppercase tracking-[0.14em] text-ink-subtle">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-cream-raised border px-4 py-4 text-[16px] focus:outline-none transition-colors ${tabular ? "tabular" : ""} ${error ? "border-ink-strong" : "border-line focus:border-gold"}`}
      />
      {error && <span className="text-[12px] text-ink-strong">{error}</span>}
    </label>
  );
}

function CheckmarkDraw() {
  return (
    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <motion.path
          d="M4 12.5L9 17.5L20 6.5"
          stroke="oklch(0.155 0.024 250)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        />
      </svg>
    </span>
  );
}

function FieldArea({ label, name, error }: { label: string; name: string; error?: string }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12.5px] uppercase tracking-[0.14em] text-ink-subtle">{label}</span>
      <textarea
        name={name}
        rows={5}
        className={`w-full rounded-xl bg-cream-raised border px-4 py-4 text-[16px] resize-none focus:outline-none transition-colors ${error ? "border-ink-strong" : "border-line focus:border-gold"}`}
      />
      {error && <span className="text-[12px] text-ink-strong">{error}</span>}
    </label>
  );
}
