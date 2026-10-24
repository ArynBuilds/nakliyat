import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { PageCta } from "@/components/common/page-cta";
import { FaqList } from "@/components/common/faq";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal";
import { SERVICES, getService } from "@/data/services";
import { FAQ } from "@/data/faq";
import { CheckIcon, ArrowRight } from "@/components/icons";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Hizmet bulunamadı" };
  return {
    title: s.title,
    description: s.short,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return notFound();

  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title={service.title}
        intro={service.long}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/teklif-al"
            className="inline-flex items-center gap-2 rounded-xl bg-ink-strong text-cream-base px-6 py-3.5 font-medium hover:bg-ink transition-colors"
          >
            Bu hizmet için teklif al <ArrowRight size={16} />
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3.5 font-medium hover:bg-cream-sunken transition-colors"
          >
            Tüm hizmetler
          </Link>
        </div>
      </PageHero>

      {/* What we do — bullets */}
      <section className="bg-cream-base py-24 md:py-32">
        <div className="container-comfy grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="text-eyebrow text-ink-subtle mb-4">Ne yapıyoruz?</p>
              <h2 className="text-display-md font-editorial text-ink-strong leading-tight max-w-[16ch]">
                Bu hizmet kapsamında.
              </h2>
            </ScrollReveal>
          </div>
          <StaggerGroup className="lg:col-span-7 grid gap-3">
            {service.bullets.map((b) => (
              <StaggerItem key={b}>
                <div className="flex items-start gap-4 rounded-xl bg-cream-raised border border-line p-5">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center text-gold-deep">
                    <CheckIcon size={16} />
                  </span>
                  <p className="text-[15.5px] md:text-[16px] text-ink-strong leading-relaxed">{b}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-sunken py-24 md:py-32">
        <div className="container-comfy">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-4">Nasıl işliyor</p>
            <h2 className="text-display-md font-editorial text-ink-strong max-w-[20ch] mb-16">
              Süreç — adım adım.
            </h2>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {service.process.map((p, i) => (
              <StaggerItem key={p.title}>
                <article className="bg-cream-raised border border-line rounded-2xl p-6 md:p-7 h-full">
                  <p className="text-[40px] md:text-[56px] font-editorial text-gold tabular leading-none mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-headline text-ink-strong mb-3">{p.title}</h3>
                  <p className="text-[14px] text-ink-muted leading-relaxed">{p.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Pricing factors */}
      <section data-tone="night" className="bg-night-base text-night-text py-24 md:py-32">
        <div className="container-comfy grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="text-eyebrow text-gold mb-4">Fiyatlandırma kriterleri</p>
              <h2 className="text-display-md font-editorial leading-tight max-w-[16ch]">
                Fiyatı belirleyen şey, eşyalar değil — <span className="text-gold">durumlar.</span>
              </h2>
              <p className="text-night-muted mt-6 leading-relaxed max-w-md">
                Net rakam için kısa bir keşif görüşmesi yeterli. Sürpriz kalem çıkarmayız.
              </p>
            </ScrollReveal>
          </div>
          <StaggerGroup className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.pricingFactors.map((f) => (
              <StaggerItem key={f}>
                <div className="rounded-2xl bg-night-raised border border-line-night p-5 h-full">
                  <p className="text-[15px] leading-relaxed">{f}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <FaqList items={FAQ} />
      <PageCta />
    </>
  );
}
