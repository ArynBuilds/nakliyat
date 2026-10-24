import Link from "next/link";
import { Logo } from "./logo";
import { CONTACT, SITE } from "@/lib/contact";
import { SERVICES } from "@/data/services";
import { PhoneIcon, WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-tone="night"
      className="relative bg-night-base text-night-text overflow-hidden"
    >
      <div className="absolute inset-x-0 bottom-0 h-[60%] topo-pattern opacity-50 pointer-events-none" />

      <div className="relative container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Link href="/" className="text-night-text">
              <Logo size="lg" />
            </Link>
            <p className="text-night-muted text-[18px] max-w-md leading-relaxed">
              {SITE.tagline} Yirmi beş yılı aşkın deneyimle, İstanbul'un
              her köşesinden Türkiye'nin 81 iline kadar.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gold text-ink-strong px-5 py-3 font-medium hover:bg-gold-deep transition-colors"
              >
                <WhatsAppIcon size={18} /> WhatsApp ile yaz
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl border border-line-night-strong px-5 py-3 font-medium tabular hover:bg-night-raised transition-colors"
              >
                <PhoneIcon size={18} /> {CONTACT.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-eyebrow text-night-muted mb-5">Hizmetler</p>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    className="text-night-text/85 hover:text-gold transition-colors text-[14.5px]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-eyebrow text-night-muted mb-5">Kurumsal</p>
            <ul className="flex flex-col gap-3">
              <li><Link href="/kurumsal" className="text-night-text/85 hover:text-gold transition-colors text-[14.5px]">Hakkımızda</Link></li>
              <li><Link href="/galeri" className="text-night-text/85 hover:text-gold transition-colors text-[14.5px]">Galeri</Link></li>
              <li><Link href="/teklif-al" className="text-night-text/85 hover:text-gold transition-colors text-[14.5px]">Teklif Al</Link></li>
              <li><Link href="/iletisim" className="text-night-text/85 hover:text-gold transition-colors text-[14.5px]">İletişim</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-eyebrow text-night-muted mb-5">İletişim</p>
            <ul className="flex flex-col gap-4 text-[14.5px]">
              <li className="flex items-start gap-3">
                <PhoneIcon size={16} className="mt-1 opacity-60" />
                <a href={`tel:${CONTACT.phoneTel}`} className="tabular hover:text-gold transition-colors">{CONTACT.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon size={16} className="mt-1 opacity-60" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold transition-colors break-all">{CONTACT.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon size={16} className="mt-1 opacity-60" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon size={16} className="mt-1 opacity-60" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-6">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] rounded-full border border-line-night px-4 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] rounded-full border border-line-night px-4 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line-night flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12.5px] text-night-muted">
          <p>© {year} Yusufoğlu Nakliyat. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap gap-6">
            <li><Link href="/cerez" className="hover:text-gold transition-colors">Çerez Politikası</Link></li>
            <li><span className="tabular">{CONTACT.founded}&apos;den bu yana</span></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
