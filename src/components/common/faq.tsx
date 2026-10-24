"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { FaqItem } from "@/data/faq";

type Props = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
};

export function FaqList({ items, eyebrow = "Sıkça sorulanlar", title = "Aklınızdaki soruların cevapları." }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream-base py-24 md:py-36">
      <div className="container-comfy">
        <ScrollReveal>
          <p className="text-eyebrow text-ink-subtle mb-4">{eyebrow}</p>
          <h2 className="text-display-lg font-editorial text-ink-strong max-w-[20ch] mb-12">{title}</h2>
        </ScrollReveal>

        <ul className="border-t border-line">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left"
                >
                  <span className="text-[17px] md:text-[19px] font-display font-medium text-ink-strong">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 280ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15.5px] md:text-[16px] text-ink-muted leading-relaxed pb-8 max-w-3xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
