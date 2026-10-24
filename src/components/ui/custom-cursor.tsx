"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, label";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let down = false;

    function move(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      hovering = !!target.closest?.(INTERACTIVE);
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.opacity = "1";
      ring.style.width = hovering ? "44px" : "30px";
      ring.style.height = hovering ? "44px" : "30px";
      ring.style.borderColor = hovering ? "oklch(0.815 0.150 80)" : "oklch(0.155 0.024 250 / 0.4)";
    }

    function downHandler() { down = true; }
    function upHandler() { down = false; }

    function leave() {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) ring.style.opacity = "0";
      if (dot) dot.style.opacity = "0";
    }
    function enter() {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) ring.style.opacity = "1";
      if (dot) dot.style.opacity = "1";
    }

    function tick() {
      dx += (mx - dx) * 0.42;
      dy += (my - dy) * 0.42;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0) scale(${down ? 0.6 : 1})`;
      if (ring) ring.style.transform = `translate3d(${rx - 15}px, ${ry - 15}px, 0) scale(${down ? 0.85 : 1})`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mouseup", upHandler);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", downHandler);
      window.removeEventListener("mouseup", upHandler);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border opacity-0"
        style={{
          width: 30,
          height: 30,
          borderWidth: 1,
          mixBlendMode: "difference",
          transition: "width 240ms cubic-bezier(0.16, 1, 0.3, 1), height 240ms cubic-bezier(0.16, 1, 0.3, 1), border-color 240ms",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full opacity-0"
        style={{
          width: 6,
          height: 6,
          background: "oklch(0.815 0.150 80)",
          mixBlendMode: "difference",
          transition: "transform 80ms linear, opacity 240ms",
        }}
      />
    </>
  );
}
