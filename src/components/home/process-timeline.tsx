"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Teklif al",
    body: "Online form veya yerinde keşifle eşya hacmini ve rotanızı netleştiririz. Ücretsiz, sürpriz kalem yok.",
  },
  {
    n: "02",
    title: "Planla",
    body: "Tarih, paketleme detayları, asansör ihtiyacı ve sigorta tutarını birlikte planlarız.",
  },
  {
    n: "03",
    title: "Taşı",
    body: "Uzman ekip, tam donanımlı araç ve sigortalı yük. Çıkıştan varışa tek bir ekiple.",
  },
  {
    n: "04",
    title: "Yerleştir",
    body: "Yeni evinizde mobilyalar kurulur, kutular istenen odalara taşınır. Sizin işiniz yalnızca açmak.",
  },
];

export function ProcessTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const progressX = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const truckX = useTransform(scrollYProgress, [0.02, 0.98], ["-3%", "97%"]);

  if (reduced) {
    return <ProcessStaticFallback />;
  }

  return (
    <section ref={wrapperRef} className="bg-cream-base relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container-wide relative">
          <p className="text-eyebrow text-ink-subtle mb-4">Süreç nasıl işler</p>
          <h2 className="text-display-xl font-editorial text-ink-strong mb-16 md:mb-24 max-w-[18ch]">
            Dört adım, tek bir ekip.
          </h2>

          <div className="relative">
            {/* Route line */}
            <div className="absolute left-0 right-0 top-12 h-px bg-line">
              <motion.div
                style={{ width: progressX }}
                className="h-px bg-gold"
              />
            </div>

            {/* Truck */}
            <motion.div
              style={{ left: truckX }}
              className="absolute top-7 -translate-x-1/2 z-10"
            >
              <svg width="42" height="22" viewBox="0 0 42 22" fill="none" aria-hidden>
                <rect x="0.5" y="3" width="22" height="14" rx="1.4" fill="oklch(0.155 0.024 250)" />
                <rect x="22.5" y="6" width="10" height="11" rx="1.4" fill="oklch(0.245 0.020 250)" />
                <rect x="24" y="7.5" width="6" height="5" rx="0.6" fill="oklch(0.910 0.080 85 / 0.6)" />
                <circle cx="6" cy="18" r="3" fill="oklch(0.155 0.024 250)" stroke="oklch(0.815 0.150 80)" strokeWidth="0.8" />
                <circle cx="16" cy="18" r="3" fill="oklch(0.155 0.024 250)" stroke="oklch(0.815 0.150 80)" strokeWidth="0.8" />
                <circle cx="29" cy="18" r="3" fill="oklch(0.155 0.024 250)" stroke="oklch(0.815 0.150 80)" strokeWidth="0.8" />
              </svg>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 pt-24">
              {STEPS.map((s, i) => (
                <Step key={s.n} {...s} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  body,
  index,
  progress,
}: {
  n: string;
  title: string;
  body: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = 0.05 + index * 0.22;
  const end = start + 0.18;

  const opacity = useTransform(progress, [start - 0.06, start, end, end + 0.1], [0.32, 1, 1, 0.6]);
  const scale = useTransform(progress, [start - 0.06, start, end + 0.1], [0.98, 1.02, 1]);
  const numberColor = useTransform(progress, [start - 0.04, start + 0.04], ["oklch(0.665 0.010 250)", "oklch(0.815 0.150 80)"]);

  return (
    <motion.div style={{ opacity, scale }} className="relative">
      <motion.p
        style={{ color: numberColor }}
        className="text-[44px] md:text-[64px] font-editorial mb-3 leading-none tabular"
      >
        {n}
      </motion.p>
      <h3 className="text-headline text-ink-strong mb-3">{title}</h3>
      <p className="text-ink-muted text-[14.5px] leading-relaxed max-w-[28ch]">{body}</p>
    </motion.div>
  );
}

function ProcessStaticFallback() {
  return (
    <section className="bg-cream-base py-24 md:py-36">
      <div className="container-wide">
        <p className="text-eyebrow text-ink-subtle mb-4">Süreç nasıl işler</p>
        <h2 className="text-display-xl font-editorial text-ink-strong mb-16 max-w-[18ch]">
          Dört adım, tek bir ekip.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {STEPS.map((s) => (
            <div key={s.n}>
              <p className="text-[44px] md:text-[64px] font-editorial mb-3 leading-none tabular text-gold">
                {s.n}
              </p>
              <h3 className="text-headline text-ink-strong mb-3">{s.title}</h3>
              <p className="text-ink-muted text-[14.5px] leading-relaxed max-w-[28ch]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
