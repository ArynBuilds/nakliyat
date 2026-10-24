"use client";

import { Marquee } from "@/components/ui/marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { StarIcon } from "@/components/icons";

export function TestimonialMarquee() {
  const top = TESTIMONIALS.slice(0, 6);
  const bottom = TESTIMONIALS.slice(6);
  const highlights = TESTIMONIALS.filter((t) => t.highlight).slice(0, 3);

  return (
    <section className="bg-cream-base py-24 md:py-36 relative overflow-hidden">
      <div className="container-wide mb-12 md:mb-16">
        <ScrollReveal>
          <p className="text-eyebrow text-ink-subtle mb-4">Müşterilerimiz ne diyor</p>
          <h2 className="text-display-xl font-editorial text-ink-strong max-w-[20ch]">
            On binlerce taşınan aile, tek bir özen.
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-5 mb-20 md:mb-28">
        <Marquee speed={32}>
          {top.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </Marquee>
        <Marquee speed={28} reverse>
          {bottom.map((t) => (
            <Card key={t.id} t={t} />
          ))}
        </Marquee>
      </div>

      <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
        {highlights.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 0.08}>
            <article className="h-full p-7 md:p-8 rounded-2xl bg-cream-raised border border-line">
              <div className="flex gap-1 text-gold mb-4">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <StarIcon key={k} filled />
                ))}
              </div>
              <p className="text-[18px] md:text-[20px] font-editorial text-ink-strong leading-snug mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-line">
                <p className="text-[14px] font-medium text-ink-strong">{t.name}</p>
                <p className="text-[12.5px] text-ink-muted mt-0.5">{t.neighborhood}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="inline-block w-[300px] md:w-[380px] shrink-0 p-5 md:p-6 rounded-2xl bg-cream-raised border border-line whitespace-normal">
      <div className="flex gap-1 text-gold mb-3">
        {Array.from({ length: t.rating }).map((_, k) => (
          <StarIcon key={k} filled size={12} />
        ))}
      </div>
      <p className="text-[14.5px] md:text-[15.5px] text-ink-strong leading-snug line-clamp-3">
        &ldquo;{t.quote}&rdquo;
      </p>
      <p className="text-[12.5px] text-ink-muted mt-3">
        {t.name} · {t.neighborhood}
      </p>
    </div>
  );
}
