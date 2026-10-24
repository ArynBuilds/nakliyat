"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CloseIcon, PhoneIcon, WhatsAppIcon, ArrowRight } from "@/components/icons";
import { Logo } from "./logo";
import { CONTACT } from "@/lib/contact";

type NavItem = { href: string; label: string };

type Props = {
  onClose: () => void;
  nav: NavItem[];
};

export function MobileNav({ onClose, nav }: Props) {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 bg-night-base text-night-text"
      data-tone="night"
    >
      <div className="absolute inset-0 grain" />
      <div className="relative h-full flex flex-col container-wide py-6">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="text-night-text">
            <Logo size="md" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-line-night-strong"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center gap-1">
          {nav.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-line-night py-6 text-display-md font-editorial"
              >
                <span>{item.label}</span>
                <ArrowRight size={22} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + nav.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/teklif-al"
              onClick={onClose}
              className="group flex items-center justify-between border-b border-line-night py-6 text-display-md font-editorial text-gold"
            >
              <span>Teklif Al</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-3 pt-6"
        >
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gold text-ink-strong py-4 font-medium"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-line-night-strong py-4 font-medium"
          >
            <PhoneIcon size={18} />
            Hemen Ara
          </a>
        </motion.div>

        <p className="text-center text-[13px] text-night-muted pt-4 tabular">{CONTACT.phone}</p>
      </div>
    </motion.div>
  );
}
