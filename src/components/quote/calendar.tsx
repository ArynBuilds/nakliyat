"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";

// Recipe lifted from the Yusufoğlu reference design — cream surface, 16px
// radius, 7-col grid, ink-bg + cream-text on selection with a 1.04 scale spring,
// gold-coloured "today", monoline DOW headings, ease-out-expo transitions.

const TR_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
const TR_DOW = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

type Props = {
  value?: string; // YYYY-MM-DD
  onChange: (val: string) => void;
};

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function fmt(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function parse(iso: string | undefined): Date | null {
  if (!iso) return null;
  const parts = iso.split("-").map(Number);
  const y = parts[0];
  const m = parts[1];
  const d = parts[2];
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function Calendar({ value, onChange }: Props) {
  const today = startOfDay(new Date());
  const selected = parse(value);
  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: { date: Date; inMonth: boolean }[] = [];
    for (let i = firstDow; i > 0; i--) {
      list.push({ date: new Date(year, month, 1 - i), inMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      list.push({ date: new Date(year, month, i), inMonth: true });
    }
    while (list.length % 7 !== 0) {
      const lastEntry = list[list.length - 1];
      if (!lastEntry) break;
      const last = lastEntry.date;
      list.push({
        date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
        inMonth: false,
      });
    }
    return list;
  }, [view]);

  const monthLabel = `${TR_MONTHS[view.getMonth()]} ${view.getFullYear()}`;
  const monthKey = `${view.getFullYear()}-${view.getMonth()}`;

  const earliestNav = new Date(today.getFullYear(), today.getMonth(), 1);
  const canPrev = view > earliestNav;

  function prevMonth() {
    if (!canPrev) return;
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }
  function nextMonth() {
    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  }

  return (
    <div className="rounded-2xl border border-line bg-cream-raised p-5 md:p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canPrev}
          aria-label="Önceki ay"
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-line text-ink hover:border-ink-strong hover:text-ink-strong transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowRight size={14} className="rotate-180" />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.h4
            key={monthKey}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18px] md:text-[20px] font-display font-medium text-ink-strong tabular"
          >
            {monthLabel}
          </motion.h4>
        </AnimatePresence>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Sonraki ay"
          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-line text-ink hover:border-ink-strong hover:text-ink-strong transition-colors"
        >
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {TR_DOW.map((d) => (
          <div
            key={d}
            className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-subtle text-center py-2"
          >
            {d}
          </div>
        ))}

        {cells.map((cell, i) => {
          const isToday = cell.date.getTime() === today.getTime();
          const isSelected =
            selected !== null && cell.date.getTime() === selected.getTime();
          const isPast = cell.date < today;
          const disabled = isPast || !cell.inMonth;
          return (
            <motion.button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(fmt(cell.date))}
              aria-label={cell.date.toLocaleDateString("tr-TR", {
                day: "numeric", month: "long", year: "numeric",
              })}
              animate={isSelected ? { scale: 1.04 } : { scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                mass: 0.7,
              }}
              className={cn(
                "aspect-square rounded-[10px] flex items-center justify-center text-[14px] border transition-colors duration-200 tabular",
                isSelected
                  ? "bg-ink-strong text-cream-base border-ink-strong"
                  : "border-transparent",
                !isSelected && !disabled && "text-ink hover:border-ink-strong cursor-pointer",
                disabled && "text-ink-subtle/40 cursor-not-allowed",
                isToday && !isSelected && "text-gold-deep font-semibold"
              )}
            >
              {cell.date.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
