import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { ArrowRight, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function PageCta() {
  return (
    <section data-tone="night" className="bg-night-base text-night-text py-20 md:py-28">
      <div className="container-comfy grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <h2 className="text-display-md md:text-display-lg font-editorial leading-tight max-w-[18ch]">
          Bir konuşma, geri kalanı biz.
        </h2>
        <div className="flex flex-col gap-3">
          <Link
            href="/teklif-al"
            className="group inline-flex items-center justify-between gap-3 rounded-xl bg-gold text-ink-strong px-6 py-5 font-medium hover:bg-gold-deep transition-colors"
          >
            <span>Ücretsiz teklif al</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between gap-3 rounded-xl border border-line-night-strong px-6 py-5 font-medium hover:bg-night-raised transition-colors"
          >
            <span className="inline-flex items-center gap-3"><WhatsAppIcon size={18} /> WhatsApp ile yaz</span>
            <ArrowRight size={18} />
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex items-center justify-between gap-3 rounded-xl border border-line-night px-6 py-5 font-medium tabular hover:bg-night-raised transition-colors"
          >
            <span className="inline-flex items-center gap-3"><PhoneIcon size={18} /> {CONTACT.phone}</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
