import type { Metadata } from "next";
import { PageHero } from "@/components/common/page-hero";
import { PageCta } from "@/components/common/page-cta";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Yusufoğlu Nakliyat'tan gerçek taşıma fotoğrafları. Evden eve, ofis, şehirlerarası ve ekipten kareler.",
};

export default function GaleriPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Yapılan iş kendi"
        highlight="hikayesini anlatır."
        intro="Yıllar içinde gerçekleştirdiğimiz taşımalardan, ekibimizden ve filomuzdan kareler. Stok değil, gerçek."
      />
      <GalleryGrid />
      <PageCta />
    </>
  );
}
