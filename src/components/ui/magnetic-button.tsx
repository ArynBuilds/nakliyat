"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gold";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-ink-strong text-cream-base hover:bg-ink data-[tone=night]:bg-cream-base data-[tone=night]:text-ink-strong",
  secondary:
    "border border-line-strong text-ink-strong hover:bg-cream-sunken data-[tone=night]:border-line-night-strong data-[tone=night]:text-night-text data-[tone=night]:hover:bg-night-raised",
  ghost: "text-ink-strong hover:bg-cream-sunken data-[tone=night]:text-night-text data-[tone=night]:hover:bg-night-raised",
  gold: "bg-gold text-ink-strong hover:bg-gold-deep",
};

export function MagneticButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  external,
  ariaLabel,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const k = 60;
    const fx = dx * (1 - Math.exp(-Math.abs(dx) / k)) * 0.18;
    const fy = dy * (1 - Math.exp(-Math.abs(dy) / k)) * 0.18;
    x.set(fx);
    y.set(fy);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="relative inline-flex items-center gap-3"
    >
      {children}
    </motion.span>
  );

  const base =
    "group relative inline-flex items-center justify-center rounded-xl font-display font-medium tracking-tight transition-colors duration-200 px-7 py-[18px] md:px-9 md:py-[22px] text-base md:text-[17px]";

  const content = (
    <div
      ref={ref}
      data-mb={variant}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(base, variantStyles[variant], className)}
    >
      {inner}
    </div>
  );

  if (href) {
    if (external || href.startsWith("tel:") || href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="inline-block"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} type={type} className="inline-block">
      {content}
    </button>
  );
}

export function ArrowRightLine({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <span className="block w-0 group-hover:w-6 h-px bg-current transition-[width] duration-300 ease-out" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
        <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
