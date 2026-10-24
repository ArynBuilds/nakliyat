"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { CONTACT } from "@/lib/contact";
import { ArrowRight, MenuIcon, PhoneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // — Scroll: condense + glass after first scroll —
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // — Tone detection: detect when a [data-tone="night"] section is under the header —
  useEffect(() => {
    let raf = 0;
    function check() {
      const sections = document.querySelectorAll<HTMLElement>('[data-tone="night"]');
      let over = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top < 96 && r.bottom > 0) over = true;
      });
      setOverDark(over);
    }
    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // — Body lock for mobile menu —
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // When scrolled, the cream-tinted glass takes over → always use ink text
  // When not scrolled, follow the section tone underneath
  const useDark = !scrolled && overDark;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5",
          useDark ? "text-night-text" : "text-ink-strong"
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-300",
            scrolled ? "container-comfy" : "container-wide"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl transition-all duration-300",
              scrolled
                ? "glass border border-line px-4 md:px-6 py-3"
                : "px-2 md:px-4 py-2"
            )}
          >
            <Link href="/" aria-label="Anasayfa" className="inline-flex">
              <Logo size={scrolled ? "sm" : "md"} />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] font-medium tracking-tight transition-colors",
                    scrolled
                      ? "text-ink hover:text-ink-strong"
                      : useDark
                      ? "text-night-text/85 hover:text-gold"
                      : "text-ink hover:text-ink-strong"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className={cn(
                  "hidden lg:inline-flex items-center gap-2 text-[13px] font-medium tabular transition-colors",
                  useDark && !scrolled
                    ? "text-night-muted hover:text-gold"
                    : "text-ink-muted hover:text-ink-strong"
                )}
              >
                <PhoneIcon size={16} />
                {CONTACT.phone}
              </a>
              <Link
                href="/teklif-al"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium transition-colors",
                  useDark && !scrolled
                    ? "bg-gold text-ink-strong hover:bg-gold-deep"
                    : "bg-ink-strong text-cream-base hover:bg-ink"
                )}
              >
                Teklif Al
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <button
              type="button"
              className={cn(
                "md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border",
                useDark && !scrolled
                  ? "border-line-night-strong text-night-text"
                  : "border-line text-ink-strong"
              )}
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60]"
          >
            <MobileNav onClose={() => setOpen(false)} nav={NAV} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
