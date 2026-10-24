import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteWizard } from "@/components/quote/quote-wizard";

export const metadata: Metadata = {
  title: "Ücretsiz Teklif Al",
  description:
    "Birkaç adımda taşıma teklifi alın. Ekibimiz 30 dakika içinde size dönecek. Sürpriz kalem, gizli ücret yok.",
};

export default function TeklifAlPage() {
  return (
    <Suspense fallback={null}>
      <QuoteWizard />
    </Suspense>
  );
}
