"use client";

import { ServiceCard } from "./service-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SERVICES } from "@/data/services";
import {
  TruckIcon,
  ElevatorIcon,
  PianoIcon,
  PackageTapeIcon,
  WarehouseIcon,
  BoxIcon,
} from "@/components/icons";

const ICONS = [
  <TruckIcon key="truck" size={42} />,
  <ElevatorIcon key="elevator" size={42} />,
  <BoxIcon key="box" size={42} />,
  <PianoIcon key="piano" size={42} />,
  <PackageTapeIcon key="tape" size={42} />,
  <WarehouseIcon key="warehouse" size={42} />,
];

export function ServicesGrid() {
  return (
    <section data-tone="night" className="bg-night-base text-night-text py-24 md:py-36 relative overflow-hidden">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <ScrollReveal>
            <p className="text-eyebrow text-gold mb-4">Ne yapıyoruz?</p>
            <h2 className="text-display-xl font-editorial max-w-[20ch]">
              Taşınmanın her ayrıntısını biz üstleniyoruz.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-night-muted text-[15px] md:text-[16px] max-w-md leading-relaxed">
              Stüdyodan dört odalı eve, küçük bir parçadan tüm bir ofise; her taşımayı
              keşiften yerleştirmeye uzman tek ekiple tamamlıyoruz.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              description={s.short}
              href={`/hizmetler/${s.slug}`}
              icon={ICONS[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
