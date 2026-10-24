"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STATS = [
  { value: 25, suffix: "+", label: "Yıllık Deneyim" },
  { value: 10000, suffix: "+", label: "Taşınan Aile" },
  { value: 39, suffix: "", label: "İstanbul İlçesi" },
  { value: 81, suffix: "", label: "Şehir" },
];

export function StatSlab() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="stats"
      ref={ref}
      className="relative bg-cream-sunken py-20 md:py-32 overflow-hidden"
    >
      <div className="container-wide relative">
        <ScrollReveal>
          <p className="text-eyebrow text-ink-subtle mb-10 md:mb-14">Bir bakışta</p>
        </ScrollReveal>

        <ul className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
          {STATS.map((s, i) => (
            <ScrollReveal
              as="li"
              key={s.label}
              delay={i * 0.07}
              className="border-r border-b border-line py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-7"
            >
              <span className="block text-[10.5px] md:text-[12px] tabular text-ink-subtle font-mono uppercase tracking-[0.18em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-mono tabular text-ink-strong leading-none tracking-[-0.02em] mt-3 md:mt-5 text-[28px] sm:text-[34px] md:text-[44px] lg:text-[40px] xl:text-[52px]">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <span className="block text-[11px] md:text-[13px] uppercase tracking-[0.14em] text-ink-muted mt-2 md:mt-3">
                {s.label}
              </span>
            </ScrollReveal>
          ))}
        </ul>

        <motion.div
          style={{ width: lineWidth }}
          className="mt-12 h-px bg-ink-strong/40"
        />
      </div>
    </section>
  );
}
