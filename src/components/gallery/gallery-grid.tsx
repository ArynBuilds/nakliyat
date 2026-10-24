"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { CloseIcon, ArrowRight } from "@/components/icons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Tile = {
  id: string;
  src: string;
  alt: string;
  category: "evden-eve" | "ofis" | "sehirlerarasi" | "ekibimiz" | "araclarimiz";
  ratio: "tall" | "wide" | "square";
};

const FILTERS: { value: Tile["category"] | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "evden-eve", label: "Evden eve" },
  { value: "ofis", label: "Ofis" },
  { value: "sehirlerarasi", label: "Şehirlerarası" },
  { value: "ekibimiz", label: "Ekibimiz" },
  { value: "araclarimiz", label: "Araçlarımız" },
];

const TILES: Tile[] = Array.from({ length: 24 }).map((_, i) => {
  const cats: Tile["category"][] = ["evden-eve", "ofis", "sehirlerarasi", "ekibimiz", "araclarimiz"];
  const ratios: Tile["ratio"][] = i % 5 === 0 ? ["tall"] : i % 4 === 0 ? ["wide"] : ["square", "tall", "wide"];
  return {
    id: `g-${i + 1}`,
    src: `https://picsum.photos/seed/yusufoglu-gallery-${i + 7}/900/${i % 3 === 0 ? 1200 : 900}`,
    alt: `Yusufoğlu Nakliyat galeri görseli ${i + 1}`,
    category: cats[i % cats.length] ?? "evden-eve",
    ratio: ratios[i % ratios.length] ?? "square",
  };
});

const RATIO_CLASS: Record<Tile["ratio"], string> = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "col-span-2 aspect-[16/9]",
  square: "aspect-square",
};

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [active, setActive] = useState<Tile | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? TILES : TILES.filter((t) => t.category === filter)),
    [filter]
  );

  return (
    <>
      <div className="container-wide mb-10 md:mb-14">
        <ul className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <li key={f.value}>
                <button
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
                    isActive
                      ? "border-ink-strong bg-ink-strong text-cream-base"
                      : "border-line bg-cream-raised text-ink hover:border-line-strong"
                  )}
                >
                  {f.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-wide pb-32">
        <motion.ul
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 [grid-auto-flow:dense]"
        >
          <AnimatePresence>
            {visible.map((tile, i) => (
              <ParallaxTile key={tile.id} tile={tile} index={i} onOpen={() => setActive(tile)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Lightbox active={active} onClose={() => setActive(null)} />
    </>
  );
}

function ParallaxTile({ tile, index, onOpen }: { tile: Tile; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", RATIO_CLASS[tile.ratio])}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full h-full overflow-hidden rounded-xl bg-cream-sunken"
      >
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-night-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.16em] text-night-text opacity-0 group-hover:opacity-100 transition-opacity">
          {FILTERS.find((f) => f.value === tile.category)?.label}
        </div>
      </button>
    </motion.li>
  );
}

function Lightbox({ active, onClose }: { active: Tile | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-night-base/95 flex items-center justify-center p-4 md:p-10"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[88vh] aspect-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={active.src.replace("900/900", "1600/1200").replace("900/1200", "1200/1600")}
                  alt={active.alt}
                  width={1600}
                  height={1200}
                  className="w-full h-auto max-h-[88vh] object-contain rounded-2xl"
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="absolute top-3 right-3 inline-flex items-center justify-center w-11 h-11 rounded-full bg-night-base/80 text-night-text hover:bg-night-raised transition-colors"
              >
                <CloseIcon />
              </button>
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12.5px] uppercase tracking-[0.16em] text-night-muted inline-flex items-center gap-2">
              Kapatmak için herhangi bir yere dokunun <ArrowRight size={12} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
