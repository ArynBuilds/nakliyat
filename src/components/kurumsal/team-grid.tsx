"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TEAM } from "@/data/team";

export function TeamGrid() {
  return (
    <section className="bg-cream-base py-24 md:py-36">
      <div className="container-comfy">
        <ScrollReveal>
          <p className="text-eyebrow text-ink-subtle mb-4">Ekibimiz</p>
          <h2 className="text-display-lg font-editorial text-ink-strong max-w-[20ch] mb-12">
            Bir taşımayı taşıma yapan asıl şey:
            <span className="text-gold-deep"> uygun ekip.</span>
          </h2>
        </ScrollReveal>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {TEAM.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <article className="relative overflow-hidden rounded-2xl bg-cream-sunken aspect-[3/4]">
                <Image
                  src={`https://picsum.photos/seed/${m.photoSeed}/600/800`}
                  alt={`${m.name} — ${m.role}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-base/85 via-night-base/20 to-transparent opacity-90" />

                {/* Default name plate */}
                <div className="absolute inset-x-5 bottom-5 text-night-text transition-all duration-500 ease-out group-hover:opacity-0 group-hover:translate-y-2">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-night-muted">{m.role}</p>
                  <p className="text-headline mt-1">{m.name}</p>
                </div>

                {/* Hover-revealed years of experience */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-night-text opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-gold mb-2">{m.role}</p>
                  <p className="text-display-md font-editorial leading-tight">{m.name}</p>

                  <div className="flex items-baseline gap-6 mt-5">
                    <div>
                      <p className="text-numeric-xl tabular text-gold leading-none text-[44px] md:text-[52px]">
                        {m.yearsAt}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-night-muted mt-2">
                        Yıl burada
                      </p>
                    </div>
                    <div>
                      <p className="text-numeric-xl tabular text-night-text leading-none text-[28px] md:text-[34px]">
                        {m.yearsExperience}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-night-muted mt-2">
                        Yıl tecrübe
                      </p>
                    </div>
                  </div>

                  <p className="text-[13px] text-night-muted leading-relaxed mt-5 max-w-[34ch]">
                    {m.bio}
                  </p>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
