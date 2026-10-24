"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DENSITIES } from "@/lib/teklif-schema";

type Props = {
  value?: string;
  onChange: (val: string) => void;
};

const STEPS = DENSITIES; // az, orta, cok
const ICON_COUNTS = [3, 7, 14];

export function DensitySlider({ value, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const initialIndex = Math.max(0, STEPS.findIndex((s) => s.value === value));
  const [idx, setIdx] = useState(initialIndex === -1 ? 1 : initialIndex);

  useEffect(() => {
    const v = STEPS[idx]!.value;
    if (v !== value) onChange(v);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function handleSet(i: number) {
    if (i === idx) return;
    setIdx(i);
  }

  function handleDrag(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newIdx = Math.round(ratio * (STEPS.length - 1));
    if (newIdx !== idx) setIdx(newIdx);
  }

  return (
    <div className="max-w-2xl">
      {/* Furniture icon row — multiplies as idx grows */}
      <div className="rounded-2xl border border-line bg-cream-raised p-6 md:p-8 mb-6 min-h-[160px] flex flex-wrap items-end gap-2">
        <AnimatePresence>
          {Array.from({ length: ICON_COUNTS[idx] ?? 7 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 12, opacity: 0 }}
              transition={{
                duration: 0.45,
                delay: (i % 8) * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex"
            >
              <FurnitureIcon variant={(i % 5) as 0 | 1 | 2 | 3 | 4} />
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Slider track */}
      <div
        ref={trackRef}
        className="relative h-14 select-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handleDrag(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          handleDrag(e.clientX);
        }}
      >
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-line" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-gold transition-all duration-300 ease-out"
          style={{ left: 0, width: `${(idx / (STEPS.length - 1)) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {STEPS.map((s, i) => {
            const active = i <= idx;
            const isCurrent = i === idx;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => handleSet(i)}
                className="group relative flex flex-col items-center"
                aria-pressed={isCurrent}
                aria-label={s.label}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ease-out ${
                    isCurrent
                      ? "w-7 h-7 bg-gold ring-4 ring-gold-soft"
                      : active
                      ? "w-3 h-3 bg-gold"
                      : "w-3 h-3 bg-line-strong"
                  }`}
                />
                <span
                  className={`absolute top-9 whitespace-nowrap text-[12.5px] uppercase tracking-[0.14em] transition-colors ${
                    isCurrent ? "text-ink-strong font-medium" : "text-ink-muted"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[14px] text-ink-muted mt-12">
        <span className="text-ink-strong font-medium">{STEPS[idx]?.label}</span>
        {" — "}
        {STEPS[idx]?.helper}
      </p>
    </div>
  );
}

function FurnitureIcon({ variant }: { variant: 0 | 1 | 2 | 3 | 4 }) {
  const stroke = "oklch(0.155 0.024 250 / 0.85)";
  const fill = "oklch(0.815 0.150 80 / 0.18)";
  if (variant === 0) {
    // chair
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="6" width="16" height="9" rx="1.5" stroke={stroke} strokeWidth="1.4" fill={fill} />
        <path d="M6 15v6M22 15v6M9 21h10" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 1) {
    // box
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="9" width="18" height="14" rx="0.8" stroke={stroke} strokeWidth="1.4" fill={fill} />
        <path d="M5 9l9-5 9 5M14 4v19" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === 2) {
    // lamp
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 4l10 0-3 8h-4z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" fill={fill} />
        <path d="M14 12v8M9 22h10" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 3) {
    // sofa
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="13" width="22" height="8" rx="1.6" stroke={stroke} strokeWidth="1.4" fill={fill} />
        <path d="M5 13v-3h18v3M5 21v2M23 21v2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  // wardrobe
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="4" width="16" height="20" rx="1" stroke={stroke} strokeWidth="1.4" fill={fill} />
      <path d="M14 4v20M10 14v2M18 14v2" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
