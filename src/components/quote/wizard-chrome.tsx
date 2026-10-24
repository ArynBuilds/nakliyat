"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  value?: string;
  index: number;
  completed: boolean;
  active: boolean;
  onClick: () => void;
};

type Props = {
  children: ReactNode;
  progress: number;
  stepLabel: string;
  stepIndex: number;
  stepCount: number;
  crumbs: Crumb[];
};

export function WizardChrome({ children, progress, stepLabel, stepIndex, stepCount, crumbs }: Props) {
  return (
    <div className="container-comfy pt-24 md:pt-28 pb-6 md:pb-10">
      {/* Progress */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-ink-subtle mb-2">
          <span>Teklif sihirbazı</span>
          <span className="tabular">
            {String(stepIndex + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")} · {stepLabel}
          </span>
        </div>
        <div className="h-px bg-line relative overflow-hidden">
          <motion.div
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute inset-0 bg-gold"
          />
        </div>
      </div>

      {/* Breadcrumb pills */}
      <ul className="flex flex-wrap gap-2 mb-6 md:mb-8 empty:hidden">
        {crumbs.filter((c) => c.completed).map((c) => (
          <motion.li
            key={c.index}
            layout
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={c.onClick}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors",
                "border-line bg-cream-raised text-ink-muted hover:text-ink-strong hover:border-line-strong"
              )}
            >
              <CheckIcon size={12} className="text-gold-deep" />
              <span className="text-ink-subtle">{c.label}:</span>
              <span className="font-medium text-ink">{c.value ?? "—"}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      {children}
    </div>
  );
}
