"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DistrictPicker } from "./district-picker";
import { WizardChrome } from "./wizard-chrome";
import { WizardSummary } from "./wizard-summary";
import { SubmitCelebration } from "./submit-celebration";
import { RouteLine } from "./route-line";
import { DensitySlider } from "./density-slider";
import { Calendar } from "./calendar";
import { HOME_TYPES, DENSITIES, EXTRAS, teklifSchema, type TeklifInput } from "@/lib/teklif-schema";
import { DISTRICTS } from "@/data/districts";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "from", label: "Nereden?" },
  { key: "to", label: "Nereye?" },
  { key: "home", label: "Ev tipi" },
  { key: "density", label: "Eşya yoğunluğu" },
  { key: "extras", label: "Ek hizmetler" },
  { key: "date", label: "Tarih" },
  { key: "contact", label: "İletişim" },
  { key: "summary", label: "Özet" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

type Form = Partial<TeklifInput> & { extras: string[] };

const today = () => new Date().toISOString().slice(0, 10);

export function QuoteWizard() {
  const params = useSearchParams();
  const initialFrom = params.get("bolge") ?? undefined;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<Form>({
    fromDistrict: initialFrom,
    extras: [],
    date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const districtBySlug = useMemo(
    () => Object.fromEntries(DISTRICTS.map((d) => [d.slug, d.name])),
    []
  );

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }
  function jumpTo(target: number) {
    if (target === step) return;
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  const currentKey: StepKey = STEPS[step]!.key;

  const valid = useMemo(() => {
    switch (currentKey) {
      case "from": return Boolean(form.fromDistrict);
      case "to": return Boolean(form.toDistrict);
      case "home": return Boolean(form.homeType);
      case "density": return Boolean(form.density);
      case "extras": return true;
      case "date": return Boolean(form.date && form.date >= today());
      case "contact": return Boolean(form.name && form.name.length >= 2 && form.phone && form.phone.replace(/\D/g, "").length >= 10);
      case "summary": return true;
    }
  }, [currentKey, form]);

  async function submit() {
    setServerError(null);
    setSubmitting(true);
    try {
      const parsed = teklifSchema.safeParse(form);
      if (!parsed.success) {
        setServerError("Bazı alanlar eksik. Lütfen kontrol edin.");
        return;
      }
      const r = await fetch("/api/teklif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!r.ok) {
        setServerError("Şu an gönderemedik. Lütfen birazdan tekrar deneyin veya bizi arayın.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  if (submitted) return <SubmitCelebration form={form} />;

  return (
    <WizardChrome
      progress={(step + 1) / STEPS.length}
      stepLabel={STEPS[step]!.label}
      stepIndex={step}
      stepCount={STEPS.length}
      crumbs={STEPS.map((s, i) => ({
        label: s.label,
        index: i,
        completed: i < step,
        active: i === step,
        value: crumbValue(s.key, form, districtBySlug),
        onClick: () => jumpTo(i),
      }))}
    >
      <div className="min-h-[520px] md:min-h-[460px]">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentKey}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentKey === "from" && (
            <StepBlock title="Taşıma çıkışı hangi ilçeden?" hint="İstanbul içinde 39 ilçenin tümünden hizmet veriyoruz.">
              <DistrictPicker value={form.fromDistrict} onChange={(s) => set("fromDistrict", s)} placeholder="Çıkış ilçesi…" />
            </StepBlock>
          )}

          {currentKey === "to" && (
            <StepBlock title="Varış adresi nerede?" hint="İstanbul içi veya 81 ile şehirlerarası taşıma.">
              <RouteLine fromSlug={form.fromDistrict} toSlug={form.toDistrict} />
              <DistrictPicker value={form.toDistrict} onChange={(s) => set("toDistrict", s)} allowFreeText placeholder="Varış ilçe veya şehir…" />
            </StepBlock>
          )}

          {currentKey === "home" && (
            <StepBlock title="Ev tipiniz hangisi?" hint="Eşya hacmini hesaplamamıza yardımcı olur.">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HOME_TYPES.map((h) => (
                  <li key={h.value}>
                    <button
                      type="button"
                      onClick={() => { set("homeType", h.value); setTimeout(next, 220); }}
                      className={cn(
                        "w-full rounded-xl border px-5 py-6 text-left transition-all",
                        form.homeType === h.value
                          ? "border-gold bg-gold-soft"
                          : "border-line bg-cream-raised hover:border-line-strong"
                      )}
                    >
                      <HomeIllustration value={h.value} />
                      <p className="text-[15px] font-medium text-ink-strong mt-3">{h.label}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </StepBlock>
          )}

          {currentKey === "density" && (
            <StepBlock title="Eşya yoğunluğunuz?" hint="Yaklaşık bir tahmin yeterli. Keşifte netleştiririz.">
              <DensitySlider value={form.density} onChange={(v) => set("density", v)} />
            </StepBlock>
          )}

          {currentKey === "extras" && (
            <StepBlock title="Ek hizmetler?" hint="İstediğinizi seçin, çıkarın. Tümü opsiyonel.">
              <ul className="flex flex-wrap gap-3">
                {EXTRAS.map((e) => {
                  const active = form.extras?.includes(e.value);
                  return (
                    <li key={e.value}>
                      <button
                        type="button"
                        onClick={() => {
                          const cur = form.extras ?? [];
                          set("extras", active ? cur.filter((v) => v !== e.value) : [...cur, e.value]);
                        }}
                        className={cn(
                          "rounded-full border px-5 py-3 text-[14px] font-medium inline-flex items-center gap-2 transition-all",
                          active
                            ? "border-gold bg-gold text-ink-strong"
                            : "border-line bg-cream-raised text-ink hover:border-line-strong"
                        )}
                      >
                        {active && <CheckIcon size={14} />}
                        {e.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StepBlock>
          )}

          {currentKey === "date" && (
            <StepBlock title="Tahmini taşıma tarihiniz?" hint="Yaklaşık tarih yeterli. Birlikte keşfederiz.">
              <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
                <Calendar value={form.date} onChange={(v) => set("date", v)} />
                <div className="flex-1">
                  <p className="text-eyebrow text-ink-subtle mb-3">Hızlı seçim</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickDates().map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => set("date", d.value)}
                        className={cn(
                          "rounded-xl border px-3 py-3 text-[13px] font-medium text-ink-strong text-left transition-colors",
                          form.date === d.value ? "border-gold bg-gold-soft" : "border-line bg-cream-raised hover:border-line-strong"
                        )}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </StepBlock>
          )}

          {currentKey === "contact" && (
            <StepBlock title="Size nasıl ulaşalım?" hint="Ekibimiz 30 dakika içinde dönecek.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Field label="Adınız Soyadınız">
                  <input
                    autoFocus
                    type="text"
                    value={form.name ?? ""}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full rounded-xl bg-cream-raised border border-line px-4 py-4 text-[16px] focus:border-gold focus:outline-none"
                  />
                </Field>
                <Field label="Telefon">
                  <input
                    type="tel"
                    inputMode="tel"
                    value={form.phone ?? ""}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="0 5__ ___ __ __"
                    className="w-full rounded-xl bg-cream-raised border border-line px-4 py-4 text-[16px] tabular focus:border-gold focus:outline-none"
                  />
                </Field>
                <Field label="E-posta (opsiyonel)" className="md:col-span-2">
                  <input
                    type="email"
                    value={form.email ?? ""}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full rounded-xl bg-cream-raised border border-line px-4 py-4 text-[16px] focus:border-gold focus:outline-none"
                  />
                </Field>
              </div>
            </StepBlock>
          )}

          {currentKey === "summary" && (
            <WizardSummary form={form} districtBySlug={districtBySlug} onEdit={jumpTo} />
          )}
        </motion.div>
      </AnimatePresence>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="text-[14px] font-medium text-ink-muted hover:text-ink-strong disabled:opacity-30 transition-colors inline-flex items-center gap-2"
        >
          <ArrowRight size={14} className="rotate-180" /> Geri
        </button>
        <div className="flex items-center gap-3">
          {serverError && (
            <p className="text-[13px] text-ink-strong" role="alert">{serverError}</p>
          )}
          {currentKey === "summary" ? (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-ink-strong text-cream-base px-7 py-4 font-medium hover:bg-ink transition-colors disabled:opacity-60"
            >
              {submitting ? "Gönderiliyor…" : "Teklif iste"} <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={!valid}
              className="inline-flex items-center gap-2 rounded-xl bg-ink-strong text-cream-base px-7 py-4 font-medium hover:bg-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Devam <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </WizardChrome>
  );
}

function StepBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-headline md:text-display-md font-editorial text-ink-strong leading-tight">{title}</h2>
      {hint && <p className="text-[14px] md:text-[15px] text-ink-muted mt-2 mb-5 md:mb-6">{hint}</p>}
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-[12.5px] uppercase tracking-[0.14em] text-ink-subtle">{label}</span>
      {children}
    </label>
  );
}

function quickDates() {
  const arr: { label: string; value: string }[] = [];
  const labels = ["Bu hafta", "Önümüzdeki hafta", "İki hafta sonra", "Bir ay sonra"];
  const offsets = [3, 9, 15, 30];
  const now = new Date();
  for (let i = 0; i < 4; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + (offsets[i] ?? 0));
    arr.push({ label: labels[i] ?? "", value: d.toISOString().slice(0, 10) });
  }
  return arr;
}

function HomeIllustration({ value }: { value: string }) {
  const rooms = value === "studio" ? 1 : value === "1+1" ? 2 : value === "2+1" ? 3 : value === "3+1" ? 4 : value === "4+1" ? 5 : value === "ofis" ? 4 : 3;
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" aria-hidden>
      <rect x="2" y="14" width="52" height="22" rx="1.4" stroke="oklch(0.155 0.024 250)" strokeWidth="1.2" fill="oklch(0.945 0.014 80)" />
      <path d="M2 14 L 28 4 L 54 14" stroke="oklch(0.155 0.024 250)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {Array.from({ length: rooms }).map((_, i) => (
        <rect key={i} x={6 + i * (44 / rooms)} y={20} width={Math.max(6, 40 / rooms - 2)} height={12} rx={0.6} fill="oklch(0.815 0.150 80 / 0.4)" />
      ))}
    </svg>
  );
}

function crumbValue(key: StepKey, form: Form, names: Record<string, string>): string | undefined {
  switch (key) {
    case "from": return form.fromDistrict ? names[form.fromDistrict] ?? form.fromDistrict : undefined;
    case "to": return form.toDistrict ? names[form.toDistrict] ?? form.toDistrict : undefined;
    case "home": return form.homeType ? HOME_TYPES.find((h) => h.value === form.homeType)?.label : undefined;
    case "density": return form.density ? DENSITIES.find((d) => d.value === form.density)?.label : undefined;
    case "extras": return form.extras && form.extras.length > 0 ? `${form.extras.length} hizmet` : undefined;
    case "date": return form.date || undefined;
    case "contact": return form.name || undefined;
    case "summary": return undefined;
  }
}
