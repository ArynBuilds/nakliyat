"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CharacterReveal } from "@/components/ui/character-reveal";
import { MagneticButton, ArrowRightLine } from "@/components/ui/magnetic-button";
import { CONTACT } from "@/lib/contact";
import { PhoneIcon, ArrowDown, ShieldIcon, ClockIcon, MapPinIcon } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRUST_BADGES = [
  { icon: ClockIcon, label: "25+ yıllık deneyim" },
  { icon: ShieldIcon, label: "Sigortalı taşıma" },
  { icon: PhoneIcon, label: "7/24 destek" },
  { icon: MapPinIcon, label: "İstanbul geneli" },
];

export function HomeHero() {
  return (
    <section
      data-tone="night"
      className="relative bg-night-base text-night-text min-h-svh flex flex-col overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      <BackgroundPlate />
      <Skyline />
      <Vignette />
      <Grain />

      <div className="relative z-10 container-wide flex flex-col flex-1 pt-28 md:pt-32 pb-6 md:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-eyebrow text-[#FF7A1A] mb-5 md:mb-7"
        >
          — İstanbul · {CONTACT.founded}'den bu yana
        </motion.p>

        <h1 className="font-editorial font-medium tracking-[-0.022em] leading-[0.96] text-[#FAF7F2] max-w-[16ch] text-[40px] sm:text-[52px] md:text-[68px] lg:text-[88px] xl:text-[104px]">
          <CharacterReveal text="2000'den bu yana, eviniz" />
          <br />
          <span className="text-[#FFB47A]">
            <CharacterReveal text="emin ellerde." delay={0.55} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-night-muted mt-5 md:mt-7 max-w-xl text-[15px] md:text-[17px] lg:text-[19px] leading-relaxed"
        >
          İstanbul içi ve şehirlerarası nakliyat. Asansörlü servis, profesyonel paketleme,
          sigortalı taşıma.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-3"
        >
          <MagneticButton href="/teklif-al" variant="gold">
            Ücretsiz Teklif Al <ArrowRightLine />
          </MagneticButton>
          <MagneticButton href={`tel:${CONTACT.phoneTel}`} variant="secondary">
            <span className="phone-shake inline-flex"><PhoneIcon size={18} /></span>
            <span className="tabular">Hemen Ara — {CONTACT.phone}</span>
          </MagneticButton>
        </motion.div>

        <div className="flex-1" />

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 1.5 } },
          }}
          className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] md:text-[13px] text-night-muted"
        >
          {TRUST_BADGES.map((b) => (
            <motion.li
              key={b.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="inline-flex items-center gap-2"
            >
              <b.icon size={13} className="opacity-60" />
              <span>{b.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Link
        href="#stats"
        className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 group inline-flex flex-col items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-night-muted/70 hover:text-gold transition-colors z-10"
      >
        <span>Aşağı kaydır</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ArrowDown size={12} />
        </motion.span>
      </Link>
    </section>
  );
}

function BackgroundPlate() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 80% at 70% 30%, rgba(255, 122, 26, 0.12), transparent 60%),
          radial-gradient(ellipse 50% 70% at 20% 80%, rgba(32, 109, 180, 0.18), transparent 55%)
        `,
      }}
    />
  );
}

function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{
        background:
          "linear-gradient(180deg, #0A0F1C 0%, transparent 22%, transparent 70%, rgba(10,15,28,0.85) 100%)",
      }}
    />
  );
}

function Grain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[3]"
      style={{
        opacity: 0.18,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.55 0 0 0 0 0.5 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}

// Exact skyline silhouette + mosques + bosphorus reflection + driving truck.
// Path data lifted from the Yusufoğlu reference design — 1600×400 canvas,
// silhouette buildings at 0.55 opacity, three mosques with double-minarets.
function Skyline() {
  const reduced = useReducedMotion();
  return (
    <svg
      className="absolute left-0 right-0 bottom-0 w-full pointer-events-none z-[1]"
      style={{ height: "50%", opacity: 0.55 }}
      viewBox="0 0 1600 400"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1C2438" stopOpacity="0" />
          <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect x="0" y="200" width="1600" height="200" fill="url(#hero-sky-grad)" />

      <g fill="#000" fillOpacity="0.55">
        <path d="M0 400 V300 L60 300 L60 280 L100 280 L100 260 L140 260 L140 240 Q160 230 180 240 L180 260 L220 260 L220 280 L260 280 L260 300 L300 300 L300 280 L340 280 L340 300 L400 300 L400 250 L420 240 L440 250 L440 220 Q460 200 480 220 L480 200 Q500 180 520 200 L520 220 Q540 200 560 220 L560 250 L580 250 L580 220 Q600 200 620 220 L620 240 L660 240 L680 220 L700 240 L700 280 L740 280 L740 260 L760 250 L780 260 L780 280 L820 280 L820 240 Q840 220 860 240 L860 200 L880 180 L900 200 L900 240 L920 240 L920 220 Q940 200 960 220 L960 250 L1000 250 L1000 230 L1020 220 L1040 230 L1040 270 L1080 270 L1080 240 L1100 220 L1120 240 L1120 280 L1160 280 L1160 260 L1200 260 L1200 280 L1240 280 L1240 300 L1280 300 L1280 280 L1320 280 L1320 260 L1360 260 L1360 280 L1400 280 L1400 300 L1440 300 L1440 280 L1480 280 L1480 260 L1520 260 L1520 280 L1560 280 L1560 300 L1600 300 V400 Z" />
        <circle cx="180" cy="240" r="16" fill="#000" />
        <line x1="160" y1="240" x2="160" y2="200" stroke="#000" strokeWidth="2" />
        <line x1="200" y1="240" x2="200" y2="200" stroke="#000" strokeWidth="2" />
        <circle cx="500" cy="200" r="20" />
        <line x1="478" y1="210" x2="478" y2="160" stroke="#000" strokeWidth="2" />
        <line x1="522" y1="210" x2="522" y2="160" stroke="#000" strokeWidth="2" />
        <circle cx="880" cy="200" r="18" />
        <line x1="858" y1="210" x2="858" y2="170" stroke="#000" strokeWidth="2" />
        <line x1="902" y1="210" x2="902" y2="170" stroke="#000" strokeWidth="2" />
      </g>

      <line x1="0" y1="380" x2="1600" y2="380" stroke="#FF7A1A" strokeOpacity="0.22" strokeWidth="0.5" />

      {!reduced && (
        <motion.g
          initial={{ x: -300 }}
          animate={{ x: 1900 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          <g transform="translate(0 350)">
            <rect x="0" y="-44" width="100" height="40" fill="#0A0F1C" stroke="#FF7A1A" strokeWidth="2" rx="2" />
            <rect x="100" y="-30" width="40" height="26" fill="#0A0F1C" stroke="#FF7A1A" strokeWidth="2" rx="2" />
            <rect x="106" y="-26" width="28" height="14" fill="#FF7A1A" opacity="0.5" />
            <circle cx="22" cy="0" r="9" fill="#0A0F1C" stroke="#FF7A1A" strokeWidth="2" />
            <circle cx="120" cy="0" r="9" fill="#0A0F1C" stroke="#FF7A1A" strokeWidth="2" />
            <circle cx="142" cy="-30" r="2" fill="#FFB47A">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        </motion.g>
      )}
    </svg>
  );
}
