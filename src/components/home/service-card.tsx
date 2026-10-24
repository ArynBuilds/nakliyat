"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/icons";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  index: number;
};

export function ServiceCard({ title, description, href, icon, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <Link
        href={href}
        className="relative block h-full rounded-2xl bg-night-raised text-night-text border border-line-night overflow-hidden p-7 md:p-9 min-h-[280px] md:min-h-[340px] transition-colors hover:border-gold/40"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, oklch(0.815 0.150 80 / 0.18), transparent 60%)",
            }}
          />
        </div>

        <div className="relative flex flex-col h-full">
          <div className="text-gold opacity-90 group-hover:opacity-100 transition-opacity">
            {icon}
          </div>

          <div className="mt-auto pt-12 md:pt-16">
            <p className="text-eyebrow text-night-muted mb-3">
              0{index + 1}
            </p>
            <h3 className="text-display-md font-editorial mb-4 text-night-text">
              {title}
            </h3>
            <p className="text-night-muted text-[14.5px] leading-relaxed mb-6 max-w-[28ch]">
              {description}
            </p>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-gold group-hover:gap-3 transition-[gap] duration-300">
              <span className="block w-6 h-px bg-gold transition-[width] duration-300 group-hover:w-10" />
              Detay
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
