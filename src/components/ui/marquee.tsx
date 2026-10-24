"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  speed?: number; // pixels per second
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({ children, speed = 40, reverse = false, pauseOnHover = true, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();
    let offset = 0;

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused) {
        const dir = reverse ? 1 : -1;
        offset += dir * speed * dt;
        const half = track!.scrollWidth / 2;
        if (offset <= -half) offset += half;
        if (offset >= 0 && reverse) offset -= half;
        track!.style.transform = `translate3d(${offset}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, reduced, reverse, speed]);

  return (
    <div
      className={cn("overflow-hidden w-full", className)}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div ref={trackRef} className="marquee-track whitespace-nowrap">
        <div className="inline-flex shrink-0 gap-6 pr-6">{children}</div>
        <div className="inline-flex shrink-0 gap-6 pr-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
