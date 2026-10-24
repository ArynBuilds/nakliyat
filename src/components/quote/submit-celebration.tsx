"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";
import { CheckIcon, WhatsAppIcon, PhoneIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = { form: { name?: string } };

export function SubmitCelebration({ form }: Props) {
  const reduced = useReducedMotion();
  const boxes = Array.from({ length: 16 });

  return (
    <section className="container-comfy py-20 md:py-32 relative overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none">
          {boxes.map((_, i) => {
            const x = (i * 37) % 100;
            const delay = (i * 0.07) % 1.4;
            return (
              <motion.div
                key={i}
                initial={{ y: -120, x: `${x}vw`, rotate: 0, opacity: 0 }}
                animate={{ y: "60vh", rotate: i % 2 ? 90 : -90, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8 + (i % 4) * 0.2, delay, ease: [0.5, 0, 0.75, 0] }}
                className="absolute w-7 h-7 md:w-9 md:h-9 rounded-sm bg-ink-strong/85 border border-gold/40"
              />
            );
          })}
        </div>
      )}

      <div className="relative max-w-2xl">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold mb-8"
        >
          <CheckIcon size={28} className="text-ink-strong" />
        </motion.div>

        <h1 className="text-display-xl font-editorial text-ink-strong leading-[1.02]">
          Teşekkürler{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
          <br />
          <span className="text-gold-deep">Yakında sizi arıyoruz.</span>
        </h1>

        <p className="text-[16.5px] text-ink-muted mt-6 max-w-lg leading-relaxed">
          Ekibimiz 30 dakika içinde sizi arayacak. Acil bir durum varsa aşağıdan bize ulaşın.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gold text-ink-strong px-6 py-4 font-medium hover:bg-gold-deep transition-colors"
          >
            <WhatsAppIcon size={18} /> WhatsApp ile yaz
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-4 font-medium tabular hover:bg-cream-sunken transition-colors"
          >
            <PhoneIcon size={18} /> {CONTACT.phone}
          </a>
        </div>

        <Link
          href="/"
          className="inline-block mt-10 text-[13.5px] text-ink-muted hover:text-ink-strong transition-colors uppercase tracking-[0.16em]"
        >
          ← Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
