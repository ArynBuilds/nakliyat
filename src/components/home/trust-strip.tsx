"use client";

import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal";
import { ShieldIcon, CheckIcon } from "@/components/icons";

const TRUST_FACTS = [
  { title: "Sigortalı Taşıma", body: "Her sefer çıkışta sigorta poliçesi düzenlenir. Hasar durumunda tam tazminat." },
  { title: "Vergi Levhası", body: "Resmi olarak kayıtlı, faturalı taşıma. Kurumsal taşımalarda muhasebe için tam belge." },
  { title: "Üye Dernekler", body: "İstanbul Nakliyatçılar Odası ve sektörel platformlarda aktif üyelik." },
  { title: "Önce Keşif", body: "Net rakam için kısa bir görüşme yeterli. Sürpriz kalem, gizli ücret yok." },
];

export function TrustStrip() {
  return (
    <section data-tone="night" className="bg-night-base text-night-text relative overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="container-wide py-24 md:py-36 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ScrollReveal>
              <ShieldIcon size={36} className="text-gold mb-6 opacity-90" />
              <p className="text-eyebrow text-gold mb-4">Sigorta &amp; güven</p>
              <h2 className="text-display-xl font-editorial leading-[1.04]">
                Eşyalarınız <span className="text-gold">sigortalıdır.</span>
                <br />
                Hasar durumunda tam tazminat.
              </h2>
              <p className="text-night-muted text-[16px] leading-relaxed mt-8 max-w-md">
                Her taşımayı bir poliçe ile çıkarırız. Hassas eşyalarınız için ek değer sigortası
                düzenleriz. Hasar süreci, tutanak tutmamızdan birkaç gün sonra sonuçlanır.
              </p>
            </ScrollReveal>
          </div>

          <StaggerGroup className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRUST_FACTS.map((f) => (
              <StaggerItem key={f.title}>
                <div className="rounded-2xl border border-line-night bg-night-raised p-6 h-full">
                  <div className="text-gold mb-3">
                    <CheckIcon size={20} />
                  </div>
                  <h3 className="text-headline text-night-text mb-2">{f.title}</h3>
                  <p className="text-night-muted text-[13.5px] leading-relaxed">{f.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
