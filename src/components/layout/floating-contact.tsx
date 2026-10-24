"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed z-40 right-4 bottom-4 md:right-6 md:bottom-6 flex flex-col gap-3"
      style={{
        transform: show ? "translateY(0)" : "translateY(40px)",
        opacity: show ? 1 : 0,
        transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="ring-pulse flex items-center justify-center w-14 h-14 rounded-full bg-gold text-ink-strong shadow-[0_8px_24px_oklch(0.815_0.150_80/0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        <WhatsAppIcon size={26} />
      </a>
      <a
        href={`tel:${CONTACT.phoneTel}`}
        aria-label="Hemen ara"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-ink-strong text-cream-base shadow-[0_8px_24px_oklch(0.155_0.024_250/0.3)] hover:scale-105 active:scale-95 transition-transform"
      >
        <PhoneIcon size={22} />
      </a>
    </div>
  );
}
