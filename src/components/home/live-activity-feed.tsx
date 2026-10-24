"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ACTIVITY_ENTRIES, WEEKLY_TOTAL } from "@/data/activity-feed";
import { ArrowRight } from "@/components/icons";

export function LiveActivityFeed() {
  return (
    <section className="bg-cream-base py-24 md:py-36 relative overflow-hidden">
      <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-eyebrow text-ink-subtle">Bu hafta</span>
            </div>

            <p className="font-mono tabular leading-[0.9] tracking-[-0.03em] text-ink-strong text-[120px] sm:text-[160px] md:text-[180px] lg:text-[200px]">
              <CountUp to={WEEKLY_TOTAL} />
            </p>

            <p className="text-display-md font-editorial text-ink-strong mt-2 leading-tight max-w-[16ch]">
              taşınma <span className="text-gold-deep">tamamlandı.</span>
            </p>

            <p className="text-[15.5px] text-ink-muted leading-relaxed mt-8 max-w-md">
              İstanbul içi 39 ilçede ve şehirlerarası 81 ilde, bu hafta sürdüğümüz
              rotalar. Hangi semtin merdivenini, hangi caddenin trafiğini, hangi
              apartmanın yönetimini bildiğimizi rakamlardan değil, ekibimizden öğrenirsiniz.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[13.5px] text-ink-muted mt-10">
              <li className="inline-flex items-baseline gap-2">
                <span className="text-headline tabular text-ink-strong">39</span>
                ilçe
              </li>
              <li className="inline-flex items-baseline gap-2">
                <span className="text-headline tabular text-ink-strong">81</span>
                il
              </li>
              <li className="inline-flex items-baseline gap-2">
                <span className="text-headline tabular text-ink-strong">7/24</span>
                hizmet
              </li>
            </ul>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-7 relative">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-5">Canlı akış</p>
          </ScrollReveal>
          <Ticker />
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();
    let offset = 0;

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        offset -= 22 * dt; // px/s
        const half = track!.scrollHeight / 2;
        if (offset <= -half) offset += half;
        track!.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduced]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[480px] md:h-[560px] overflow-hidden border-y border-line"
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream-base via-cream-base/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream-base via-cream-base/90 to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="will-change-transform">
        {[...ACTIVITY_ENTRIES, ...ACTIVITY_ENTRIES].map((entry, i) => (
          <Row key={`${entry.time}-${i}`} entry={entry} highlighted={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Row({ entry, highlighted }: { entry: { time: string; from: string; to: string; type: string }; highlighted: boolean }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center gap-4 md:gap-6 py-5 md:py-6 border-b border-line cursor-default"
    >
      <span
        className={`text-[11.5px] uppercase tracking-[0.16em] tabular w-[88px] md:w-[110px] shrink-0 ${
          highlighted ? "text-gold-deep" : "text-ink-subtle"
        }`}
      >
        {entry.time}
      </span>

      <span className="flex-1 inline-flex items-baseline gap-2 md:gap-3 truncate">
        <span className="text-[16px] md:text-[18px] font-display font-medium text-ink-strong truncate">
          {entry.from}
        </span>
        <ArrowRight size={14} className="text-ink-subtle opacity-50 shrink-0" />
        <span className="text-[16px] md:text-[18px] font-display font-medium text-ink truncate">
          {entry.to}
        </span>
      </span>

      <span className="text-[11.5px] uppercase tracking-[0.14em] text-ink-muted tabular shrink-0 hidden sm:inline">
        {entry.type}
      </span>
    </motion.div>
  );
}
