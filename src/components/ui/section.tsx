import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "cream" | "night" | "sunken";
type Width = "tight" | "comfy" | "wide" | "full";

type Props = {
  children: ReactNode;
  tone?: Tone;
  width?: Width;
  className?: string;
  innerClassName?: string;
  id?: string;
  spacing?: "default" | "tight" | "set-piece";
};

const toneClass: Record<Tone, string> = {
  cream: "bg-cream-base",
  sunken: "bg-cream-sunken",
  night: "bg-night-base text-night-text",
};

const widthClass: Record<Width, string> = {
  tight: "container-tight",
  comfy: "container-comfy",
  wide: "container-wide",
  full: "w-full",
};

const spacingClass = {
  default: "py-20 md:py-32",
  tight: "py-14 md:py-20",
  "set-piece": "py-24 md:py-48",
};

export function Section({
  children,
  tone = "cream",
  width = "comfy",
  className,
  innerClassName,
  id,
  spacing = "default",
}: Props) {
  return (
    <section
      id={id}
      data-tone={tone === "night" ? "night" : undefined}
      className={cn("relative", toneClass[tone], spacingClass[spacing], className)}
    >
      <div className={cn(widthClass[width], innerClassName)}>{children}</div>
    </section>
  );
}
