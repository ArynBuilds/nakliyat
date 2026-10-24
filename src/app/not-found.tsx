import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="min-h-[80svh] flex items-center bg-cream-base">
      <div className="container-comfy py-32">
        <p className="text-eyebrow text-ink-subtle mb-5">404</p>
        <h1 className="text-display-xl font-editorial text-ink-strong leading-[0.96] max-w-[16ch]">
          Bu adres taşınmış olabilir.
          <br />
          <span className="text-gold-deep">Yardımcı olalım.</span>
        </h1>
        <p className="text-[18px] text-ink-muted mt-8 max-w-lg leading-relaxed">
          Aradığınız sayfa burada değil. Sizi doğru yere yönlendirelim.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-ink-strong text-cream-base px-6 py-4 font-medium hover:bg-ink transition-colors"
          >
            Ana sayfa <ArrowRight size={16} />
          </Link>
          <Link
            href="/teklif-al"
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-4 font-medium hover:bg-cream-sunken transition-colors"
          >
            Teklif al
          </Link>
        </div>
      </div>
    </section>
  );
}
