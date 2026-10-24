"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { FLEET } from "@/data/fleet";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TruckIcon, ElevatorIcon, ArrowRight } from "@/components/icons";

export function FleetCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!trackRef.current) return;
    setDragging(true);
    startX.current = e.clientX;
    startScroll.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging || !trackRef.current) return;
    trackRef.current.scrollLeft = startScroll.current - (e.clientX - startX.current) * 1.2;
  }
  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (!trackRef.current) return;
    setDragging(false);
    try { trackRef.current.releasePointerCapture(e.pointerId); } catch { /* noop */ }
  }

  return (
    <section data-tone="night" className="bg-night-base text-night-text py-24 md:py-36 relative overflow-hidden">
      <div className="container-wide flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
        <ScrollReveal>
          <p className="text-eyebrow text-gold mb-4">Filomuz</p>
          <h2 className="text-display-xl font-editorial max-w-[20ch]">
            Her taşımaya uygun bir aracımız var.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-night-muted text-[15px] max-w-md leading-relaxed">
            Stüdyo taşıması için panelvandan, şehirlerarası TIR'a; yüksek katlar için
            32 metrelik mobil dış cephe asansörümüze kadar.
          </p>
        </ScrollReveal>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex overflow-x-auto gap-5 md:gap-7 px-[5vw] pb-8 cursor-grab active:cursor-grabbing select-none scroll-smooth"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {FLEET.map((t, i) => (
          <motion.article
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 w-[82vw] md:w-[440px] rounded-2xl bg-night-raised border border-line-night overflow-hidden"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-night-raised to-night-base flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(circle at 70% 80%, oklch(0.815 0.150 80 / 0.18), transparent 60%)",
                }}
              />
              <div className="text-gold opacity-40">
                {t.id === "k4" ? <ElevatorIcon size={120} /> : <TruckIcon size={140} />}
              </div>
              <span className="absolute top-4 left-4 text-eyebrow text-night-muted">
                0{i + 1} / {FLEET.length}
              </span>
            </div>

            <div className="p-6 md:p-7">
              <h3 className="text-headline text-night-text mb-2">{t.name}</h3>
              <p className="text-[13px] text-gold uppercase tracking-[0.14em] mb-4 tabular">
                {t.capacity} · {t.body}
              </p>
              <p className="text-night-muted text-[14.5px] leading-relaxed">{t.ideal}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="container-wide mt-2 text-[12.5px] text-night-muted flex items-center gap-2">
        <ArrowRight size={14} />
        <span>Sürükleyerek veya kaydırarak gezin</span>
      </div>
    </section>
  );
}
