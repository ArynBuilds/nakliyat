"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/contact";
import { ArrowRight, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CHARS = "ABCDEFGHIJKLMNOPRSTUVYZÇĞIİÖŞÜ ";
const PHRASE = "Taşınmaya hazır mısınız?";

function scramble(target: string, progress: number): string {
  const total = target.length;
  return Array.from(target)
    .map((c, i) => {
      const localProg = Math.min(1, Math.max(0, progress * total - i));
      if (c === " " || c === "?") return c;
      if (localProg >= 1) return c;
      if (localProg <= 0) return " ";
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export function FinalCta() {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? PHRASE : "");
  const [active, setActive] = useState<"teklif" | "whatsapp" | "tel" | null>(null);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let start = 0;
    const dur = 1400;

    function tick(now: number) {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / dur);
      setText(scramble(PHRASE, p));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        start = 0;
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });

    const el = document.getElementById("final-cta-headline");
    if (el) obs.observe(el);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [reduced]);

  return (
    <section data-tone="night" className="relative bg-night-base text-night-text overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.815 0.150 80 / 0.18), transparent 60%)",
        }}
      />

      <div className="container-wide py-32 md:py-48 relative">
        <h2
          id="final-cta-headline"
          className="text-display-2xl font-editorial leading-[0.95] max-w-[18ch] mb-16 md:mb-20"
        >
          {text || " "}
        </h2>

        <ul
          className="border-t border-line-night divide-y divide-line-night"
          onMouseLeave={() => setActive(null)}
        >
          <CtaRow
            href="/teklif-al"
            label="Ücretsiz teklif al"
            sub="30 saniyede başlayın · sonuç 30 dakikada"
            icon={<ArrowRight size={28} />}
            isActive={active === "teklif"}
            isOtherActive={active !== null && active !== "teklif"}
            onHover={() => setActive("teklif")}
          />
          <CtaRow
            href={CONTACT.whatsappUrl}
            external
            label="WhatsApp ile yaz"
            sub={`${CONTACT.instagram.replace("@", "")} · 7/24 yanıt`}
            icon={<WhatsAppIcon size={28} />}
            isActive={active === "whatsapp"}
            isOtherActive={active !== null && active !== "whatsapp"}
            onHover={() => setActive("whatsapp")}
          />
          <CtaRow
            href={`tel:${CONTACT.phoneTel}`}
            label="Hemen ara"
            sub={CONTACT.phone}
            tabular
            icon={<PhoneIcon size={28} />}
            isActive={active === "tel"}
            isOtherActive={active !== null && active !== "tel"}
            onHover={() => setActive("tel")}
          />
        </ul>
      </div>

      {/* Truck driving across bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden pointer-events-none">
        <motion.svg
          width="160"
          height="40"
          viewBox="0 0 160 40"
          fill="none"
          initial={{ x: -200 }}
          animate={{ x: "100vw" }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1"
        >
          <rect x="6" y="14" width="86" height="18" rx="2" fill="oklch(0.155 0.028 250)" stroke="oklch(0.815 0.150 80 / 0.5)" />
          <rect x="92" y="20" width="22" height="12" rx="2" fill="oklch(0.215 0.030 250)" stroke="oklch(0.815 0.150 80 / 0.5)" />
          <circle cx="22" cy="32" r="5" fill="oklch(0.155 0.028 250)" stroke="oklch(0.815 0.150 80)" />
          <circle cx="40" cy="32" r="5" fill="oklch(0.155 0.028 250)" stroke="oklch(0.815 0.150 80)" />
          <circle cx="100" cy="32" r="5" fill="oklch(0.155 0.028 250)" stroke="oklch(0.815 0.150 80)" />
        </motion.svg>
      </div>
    </section>
  );
}

function CtaRow({
  href,
  external,
  label,
  sub,
  icon,
  isActive,
  isOtherActive,
  onHover,
  tabular,
}: {
  href: string;
  external?: boolean;
  label: string;
  sub: string;
  icon: React.ReactNode;
  isActive: boolean;
  isOtherActive: boolean;
  onHover: () => void;
  tabular?: boolean;
}) {
  const inner = (
    <motion.div
      onMouseEnter={onHover}
      animate={{ scale: isActive ? 1 : isOtherActive ? 0.96 : 1, opacity: isOtherActive ? 0.45 : 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center justify-between gap-6 py-8 md:py-12"
    >
      <div className="flex-1">
        <p className={`text-display-md md:text-display-lg font-editorial leading-tight ${isActive ? "text-gold" : ""}`}>
          {label}
        </p>
        <p className={`text-[13px] md:text-[14px] text-night-muted mt-2 ${tabular ? "tabular" : ""} uppercase tracking-[0.16em]`}>
          {sub}
        </p>
      </div>
      <span className={`shrink-0 transition-colors ${isActive ? "text-gold" : "text-night-text/60"}`}>
        {icon}
      </span>
    </motion.div>
  );

  if (external || href.startsWith("tel:") || href.startsWith("https://")) {
    return (
      <li>
        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{inner}</a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href}>{inner}</Link>
    </li>
  );
}
