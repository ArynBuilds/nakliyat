import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CONTACT } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon, MailIcon, ClockIcon, MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Yusufoğlu Nakliyat'a ulaşın. Telefon, WhatsApp, e-posta veya formla — 30 dakika içinde size dönüyoruz.",
};

const CARDS = [
  {
    title: "Telefon",
    sub: CONTACT.phone,
    href: `tel:${CONTACT.phoneTel}`,
    helper: "7/24 ulaşılabilir hat",
    icon: PhoneIcon,
    tabular: true,
  },
  {
    title: "WhatsApp",
    sub: CONTACT.phone,
    href: CONTACT.whatsappUrl,
    helper: "Mesaj atın, anında yanıtlayalım",
    icon: WhatsAppIcon,
    external: true,
  },
  {
    title: "E-posta",
    sub: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    helper: "Detaylı talepleriniz için",
    icon: MailIcon,
  },
];

export default function IletisimPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title="Bir konuşma,"
        highlight="geri kalanı biz."
        intro="Telefon, WhatsApp, e-posta — hangisinden ulaşırsanız ekibimiz 30 dakika içinde dönecek."
      />

      {/* Contact cards */}
      <section className="bg-cream-base pb-20 md:pb-24">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-5">
          {CARDS.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.07}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group block rounded-2xl bg-cream-raised border border-line p-7 md:p-8 h-full transition-colors hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-soft text-gold-deep">
                    <c.icon size={22} />
                  </span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-[12.5px] uppercase tracking-[0.14em] text-ink-subtle mt-6 mb-2">{c.title}</p>
                <p className={`text-[20px] md:text-[22px] font-editorial text-ink-strong leading-tight ${c.tabular ? "tabular" : ""}`}>
                  {c.sub}
                </p>
                <p className="text-[13.5px] text-ink-muted mt-3">{c.helper}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="bg-cream-sunken py-24 md:py-32">
        <div className="container-comfy grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="text-eyebrow text-ink-subtle mb-4">Mesaj bırakın</p>
              <h2 className="text-display-md font-editorial text-ink-strong leading-tight max-w-[18ch] mb-8">
                Yazın, biz arayalım.
              </h2>
            </ScrollReveal>
            <ContactForm />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="rounded-2xl bg-night-base text-night-text overflow-hidden relative aspect-[4/3]" data-tone="night">
              <div className="absolute inset-0 grain pointer-events-none" />
              <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
                <rect width="200" height="150" fill="oklch(0.155 0.028 250)" />
                <g stroke="oklch(0.945 0.012 80 / 0.08)" strokeWidth="0.4" fill="none">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 11} x2="200" y2={i * 11} />
                  ))}
                  {Array.from({ length: 18 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 12} y1="0" x2={i * 12} y2="150" />
                  ))}
                </g>
                <path d="M0 80 Q 60 60 100 75 T 200 70" stroke="oklch(0.815 0.150 80 / 0.4)" strokeWidth="0.8" fill="none" />
                <path d="M0 95 Q 60 85 100 92 T 200 88" stroke="oklch(0.815 0.150 80 / 0.25)" strokeWidth="0.6" fill="none" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-ink-strong mb-3">
                    <MapPinIcon size={22} />
                  </div>
                  <p className="font-editorial text-[20px] text-night-text">İstanbul, Türkiye</p>
                  <p className="text-[12.5px] text-night-muted mt-1 uppercase tracking-[0.16em]">Merkez ofis</p>
                </div>
              </div>
            </div>

            <ul className="rounded-2xl bg-cream-raised border border-line p-6 md:p-7 space-y-4">
              <li className="flex items-start gap-3 text-[14.5px]">
                <ClockIcon size={18} className="text-ink-subtle mt-0.5" />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ink-subtle">Çalışma saatleri</p>
                  <p className="text-ink-strong mt-1">{CONTACT.hours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-[14.5px]">
                <MapPinIcon size={18} className="text-ink-subtle mt-0.5" />
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-ink-subtle">Adres</p>
                  <p className="text-ink-strong mt-1">{CONTACT.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
