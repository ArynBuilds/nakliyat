import type { ReactNode } from "react";
import { CharacterReveal } from "@/components/ui/character-reveal";

type Props = {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, highlight, intro, children }: Props) {
  return (
    <section className="relative bg-cream-base pt-40 md:pt-48 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute right-0 top-0 w-[60%] h-[60%] pointer-events-none opacity-50"
           style={{ background: "radial-gradient(circle at 80% 20%, oklch(0.815 0.150 80 / 0.18), transparent 60%)" }} />
      <div className="container-wide relative">
        <p className="text-eyebrow text-gold-deep mb-6">{eyebrow}</p>
        <h1 className="text-display-xl md:text-display-2xl font-editorial text-ink-strong leading-[0.96] max-w-[18ch]">
          <CharacterReveal text={title} />
          {highlight && (
            <>
              <br />
              <span className="text-gold-deep">
                <CharacterReveal text={highlight} delay={0.4} />
              </span>
            </>
          )}
        </h1>
        {intro && (
          <p className="text-[18px] md:text-[20px] text-ink-muted mt-8 max-w-2xl leading-relaxed">{intro}</p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
