import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "horizontal" | "stacked" | "mark";
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: 36, primary: "text-[15px]", secondary: "text-[10px]" },
  md: { mark: 48, primary: "text-[17px]", secondary: "text-[10.5px]" },
  lg: { mark: 80, primary: "text-[26px]", secondary: "text-[12px]" },
};

export function Logo({ className, variant = "horizontal", size = "md" }: Props) {
  const s = sizes[size];

  if (variant === "mark") {
    return (
      <Image
        src="/logo.svg"
        alt="Yusufoğlu Nakliyat"
        width={s.mark}
        height={s.mark}
        className={cn("shrink-0", className)}
        priority
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/logo.svg"
        alt="Yusufoğlu Nakliyat"
        width={s.mark}
        height={s.mark}
        className="shrink-0"
        priority
      />
      <span className={cn("flex flex-col leading-none", variant === "stacked" && "items-start")}>
        <span className={cn("font-editorial font-medium tracking-tight", s.primary)}>
          Yusufoğlu
        </span>
        <span className={cn("uppercase tracking-[0.2em] mt-1 opacity-60 font-display", s.secondary)}>
          Nakliyat · 2000
        </span>
      </span>
    </span>
  );
}
