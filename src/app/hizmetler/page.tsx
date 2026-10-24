import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { PageCta } from "@/components/common/page-cta";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SERVICES } from "@/data/services";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Evden eve nakliyat, asansörlü servis, şehirlerarası taşıma, profesyonel paketleme ve eşya depolama. Her hizmetin ayrıntısı.",
};

export default function HizmetlerHub() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title="Taşımanın her halini"
        highlight="tek elden alın."
        intro="Stüdyo dairenizden ofise, tek bir piyanodan tam bir 4+1'e; her hizmeti aynı disiplin, aynı ekiple veriyoruz."
      />

      <section className="bg-cream-base pb-32 md:pb-48">
        <div className="container-wide">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {SERVICES.map((s, i) => (
              <ScrollReveal as="li" key={s.slug} delay={i * 0.06}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group block rounded-2xl bg-cream-raised border border-line p-7 md:p-10 h-full transition-all hover:border-gold/40 hover:bg-cream-base"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-[12.5px] uppercase tracking-[0.18em] text-ink-subtle mb-3 tabular">
                        0{i + 1}
                      </p>
                      <h2 className="text-display-md font-editorial text-ink-strong leading-tight mb-4">
                        {s.title}
                      </h2>
                      <p className="text-[15px] md:text-[16px] text-ink-muted leading-relaxed max-w-md">
                        {s.short}
                      </p>
                      <ul className="mt-6 space-y-2 text-[13.5px] text-ink">
                        {s.bullets.slice(0, 2).map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-2 inline-block w-3 h-px bg-gold shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ArrowRight size={20} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </>
  );
}
