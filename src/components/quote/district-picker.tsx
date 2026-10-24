"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DISTRICTS } from "@/data/districts";
import { CheckIcon, MapPinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
  value?: string;
  onChange: (slug: string) => void;
  allowFreeText?: boolean;
  placeholder?: string;
};

export function DistrictPicker({ value, onChange, allowFreeText, placeholder }: Props) {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query
      .toLocaleLowerCase("tr-TR")
      .replace(/[ı]/g, "i")
      .replace(/[ş]/g, "s")
      .replace(/[ğ]/g, "g")
      .replace(/[ü]/g, "u")
      .replace(/[ö]/g, "o")
      .replace(/[ç]/g, "c");
    if (!q) return DISTRICTS;
    return DISTRICTS.filter((d) => d.slug.includes(q) || d.name.toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR")));
  }, [query]);

  return (
    <div className="w-full">
      <div className="relative mb-3">
        <MapPinIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder ?? "İlçe adı ile ara…"}
          className="w-full rounded-xl bg-cream-raised border border-line py-3 pl-11 pr-4 text-[15px] focus:border-gold focus:outline-none transition-colors"
          aria-label="İlçe ara"
        />
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[38vh] md:max-h-[42vh] overflow-y-auto pr-1">
        {list.map((d) => {
          const selected = value === d.slug;
          return (
            <li key={d.slug}>
              <button
                type="button"
                onClick={() => onChange(d.slug)}
                className={cn(
                  "w-full flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-[14px] transition-all",
                  selected
                    ? "border-gold bg-gold-soft text-ink-strong"
                    : "border-line bg-cream-raised text-ink hover:border-line-strong"
                )}
              >
                <span className="flex flex-col">
                  <span className="font-medium">{d.name}</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
                    {d.side === "avrupa" ? "Avrupa" : "Anadolu"}
                  </span>
                </span>
                {selected && <CheckIcon size={16} className="text-gold-deep" />}
              </button>
            </li>
          );
        })}
        {allowFreeText && query.length > 1 && !list.some((d) => d.name.toLocaleLowerCase("tr-TR") === query.toLocaleLowerCase("tr-TR")) && (
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-3">
            <button
              type="button"
              onClick={() => onChange(query.trim())}
              className="w-full rounded-xl border border-dashed border-line-strong px-4 py-4 text-left bg-cream-base hover:bg-cream-raised transition-colors"
            >
              <span className="text-[14px] font-medium text-ink-strong">"{query}" şehrini varış olarak seç</span>
              <span className="block text-[12px] text-ink-muted mt-1">Şehirlerarası taşıma için 81 il</span>
            </button>
          </motion.li>
        )}
      </ul>
    </div>
  );
}
