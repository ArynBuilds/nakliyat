"use client";

import { motion } from "framer-motion";
import { DISTRICT_POSITIONS } from "@/data/district-positions";
import { DISTRICTS } from "@/data/districts";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  fromSlug?: string;
  toSlug?: string;
};

const offMapTarget = { x: 96, y: 12 }; // top-right corner for "intercity" / unknown destinations

export function RouteLine({ fromSlug, toSlug }: Props) {
  const reduced = useReducedMotion();
  const districtBySlug = Object.fromEntries(DISTRICTS.map((d) => [d.slug, d]));

  const from = DISTRICT_POSITIONS.find((p) => p.slug === fromSlug);
  const to = DISTRICT_POSITIONS.find((p) => p.slug === toSlug);

  if (!from) return null;

  const target = to ?? offMapTarget;
  const fromName = fromSlug ? districtBySlug[fromSlug]?.name ?? fromSlug : "";
  const toName = toSlug
    ? districtBySlug[toSlug]?.name ?? toSlug
    : "Şehirlerarası";

  // Quadratic curve control point — slight upward arc
  const mx = (from.x + target.x) / 2;
  const my = Math.max(0, Math.min(from.y, target.y) - 14);

  const path = `M ${from.x} ${from.y} Q ${mx} ${my} ${target.x} ${target.y}`;
  const transition = reduced
    ? { duration: 0 }
    : { duration: 1.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="rounded-2xl bg-cream-sunken border border-line p-5 mb-8">
      <div className="flex items-center justify-between text-[12.5px] uppercase tracking-[0.16em] text-ink-subtle mb-3">
        <span>Rota önizleme</span>
        <span className="tabular">{from.x.toFixed(0)}° · {target.x.toFixed(0)}°</span>
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ aspectRatio: "2.4" }}
        aria-label={`Rota: ${fromName} → ${toName}`}
      >
        {/* — Stylized landmasses (matching IstanbulMap) — */}
        <path
          d="M0 22 Q 20 18 30 22 T 50 28 Q 56 60 50 78 L 0 80 Z"
          fill="oklch(0.987 0.008 80)"
          stroke="oklch(0.155 0.024 250 / 0.10)"
          strokeWidth="0.3"
        />
        <path
          d="M55 24 Q 70 18 95 22 L 100 26 L 100 78 Q 88 80 70 78 Q 60 76 55 70 Q 53 56 55 24 Z"
          fill="oklch(0.987 0.008 80)"
          stroke="oklch(0.155 0.024 250 / 0.10)"
          strokeWidth="0.3"
        />

        {/* — Route path (animated draw) — */}
        <motion.path
          d={path}
          fill="none"
          stroke="oklch(0.815 0.150 80)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="1.5 1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={transition}
        />

        {/* — From dot — */}
        <g>
          <circle cx={from.x} cy={from.y} r="2.6" fill="oklch(0.815 0.150 80 / 0.3)" />
          <circle cx={from.x} cy={from.y} r="1.4" fill="oklch(0.155 0.024 250)" />
          <text
            x={from.x}
            y={from.y - 4}
            fontSize="2.4"
            fill="oklch(0.155 0.024 250)"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans)"
            fontWeight={600}
          >
            {fromName}
          </text>
          <text
            x={from.x}
            y={from.y + 5}
            fontSize="1.6"
            fill="oklch(0.485 0.014 250)"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans)"
            letterSpacing="0.16em"
          >
            ÇIKIŞ
          </text>
        </g>

        {/* — To dot — */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <circle cx={target.x} cy={target.y} r="2.6" fill="oklch(0.815 0.150 80 / 0.3)" />
          <circle cx={target.x} cy={target.y} r="1.4" fill="oklch(0.815 0.150 80)" />
          <text
            x={target.x}
            y={target.y - 4}
            fontSize="2.4"
            fill="oklch(0.155 0.024 250)"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans)"
            fontWeight={600}
          >
            {toName}
          </text>
          <text
            x={target.x}
            y={target.y + 5}
            fontSize="1.6"
            fill="oklch(0.485 0.014 250)"
            textAnchor="middle"
            fontFamily="var(--font-geist-sans)"
            letterSpacing="0.16em"
          >
            VARIŞ
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
