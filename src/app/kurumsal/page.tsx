import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/common/page-hero";
import { PageCta } from "@/components/common/page-cta";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/ui/scroll-reveal";
import { CountUp } from "@/components/ui/count-up";
import { TeamGrid } from "@/components/kurumsal/team-grid";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Kurumsal — 25 Yıllık Deneyim",
  description:
    "2000'den bu yana İstanbul'un her köşesinde nakliyat. Yusufoğlu Nakliyat'ın hikayesi, ekibi ve değerleri.",
};

const TIMELINE = [
  { year: "2000", title: "Kuruluş", body: "İstanbul'da küçük bir ofis ve tek bir kapalı kasa kamyonla başlandı." },
  { year: "2008", title: "Filomuzu büyüttük", body: "Şehir içi taşımalara üç yeni kamyon ve mobil dış cephe asansörü eklendi." },
  { year: "2014", title: "Şehirlerarası ağ", body: "İlk TIR yatırımı; tüm 81 ile düzenli sefer." },
  { year: "2019", title: "Profesyonel paketleme", body: "Cam, porselen ve sanat eseri için özel ambalaj birimi açıldı." },
  { year: "2022", title: "Depolama hizmeti", body: "Klimalı, kameralı ve nem kontrollü depolarımız hizmete girdi." },
  { year: "2026", title: "Yeni dijital deneyim", body: "Online keşif, anlık teklif sihirbazı ve şeffaf süreç takibi." },
];

const VALUES = [
  { title: "Şeffaflık", body: "Sürpriz kalem yok. Net hesap, net süreç, net sigorta." },
  { title: "Özen", body: "Eşyaları kendi evimizmiş gibi taşırız. Her parçanın bir hikayesi olduğunu biliriz." },
  { title: "Süreklilik", body: "Aynı ekip, baştan sona. Yarım iş bırakmaz, gece geç de olsa bitiririz." },
  { title: "Cevap", body: "Telefon, WhatsApp, e-posta — hangisinden ulaşırsanız 30 dakika içinde dönüş." },
];

export default function KurumsalPage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        title="2000'den bu yana,"
        highlight="İstanbul'un her köşesinde."
        intro="Yusufoğlu Nakliyat, yirmi beş yılı aşkın bir süredir İstanbul ve Türkiye genelinde evden eve nakliyat hizmeti veren bir aile şirketidir. Bir kamyon ve bir telefonla başlayan yolculuk, bugün filomuzla ve ekibimizle on binlerce aileye ulaşmış durumda."
      />

      {/* Stats */}
      <section className="bg-cream-sunken py-20 md:py-28">
        <div className="container-wide">
          <ul className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
            {[
              { v: 25, s: "+", l: "Yıllık Deneyim" },
              { v: 10000, s: "+", l: "Taşınan Aile" },
              { v: 39, s: "", l: "İstanbul İlçesi" },
              { v: 81, s: "", l: "Şehir" },
            ].map((s, i) => (
              <ScrollReveal
                as="li"
                key={s.l}
                delay={i * 0.07}
                className="border-r border-b border-line py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-7"
              >
                <span className="block text-[10.5px] md:text-[12px] tabular text-ink-subtle font-mono uppercase tracking-[0.18em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono tabular text-ink-strong leading-none tracking-[-0.02em] mt-3 md:mt-5 text-[28px] sm:text-[34px] md:text-[44px] lg:text-[40px] xl:text-[52px]">
                  <CountUp to={s.v} suffix={s.s} />
                </p>
                <span className="block text-[11px] md:text-[13px] uppercase tracking-[0.14em] text-ink-muted mt-2 md:mt-3">
                  {s.l}
                </span>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-base py-24 md:py-36">
        <div className="container-tight">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-4">Hikayemiz</p>
            <h2 className="text-display-lg font-editorial text-ink-strong mb-8 leading-tight">
              Eşyaların değeri, fiyatından çok daha fazla.
            </h2>
            <div className="space-y-6 text-[17px] md:text-[18px] leading-relaxed text-ink">
              <p>
                Bir taşımanın iyi gitmesi, taşımayı yapan ekibin işine duyduğu saygıyla başlar. Yirmi
                beş yıl önce ilk kamyonumuza çıktığımız ilk taşımada da bunu öğrendik: müşterinin
                birkaç saat sonra elinin titreyeceği bardağı, dünkü çocuğun beşiğini, anneanneden
                kalan vitrini, taşımacı için bir parça eşya değil — bir hatıradır.
              </p>
              <p>
                Yusufoğlu Nakliyat olarak yıllar içinde filomuzu büyüttük, profesyonel paketlemeyi
                bir disipline dönüştürdük, sigortayı zorunlu tuttuk; ama değişmeyen tek bir şey
                kaldı: <span className="font-editorial text-ink-strong">eşyalarınızı kendi eşyalarımız gibi taşıma</span> alışkanlığımız.
              </p>
              <p>
                Bugün İstanbul'un 39 ilçesinden Türkiye'nin 81 iline kadar her noktaya ulaşan, sigortalı,
                profesyonel ve şeffaf bir nakliyat hizmeti sunuyoruz. Önce sizi dinliyor, sonra teklif
                veriyoruz.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TeamGrid />

      {/* Timeline */}
      <section className="bg-cream-sunken py-24 md:py-36">
        <div className="container-comfy">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-4">Yolculuk</p>
            <h2 className="text-display-lg font-editorial text-ink-strong max-w-[20ch] mb-16">
              Yirmi beş yılda neredeyse her şey değişti, biri hariç.
            </h2>
          </ScrollReveal>

          <ol className="relative border-l border-line ml-3 md:ml-6 space-y-12">
            {TIMELINE.map((item, i) => (
              <ScrollReveal as="li" key={item.year} delay={i * 0.06} className="relative pl-8 md:pl-12">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-cream-sunken" />
                <p className="text-[12px] uppercase tracking-[0.18em] text-ink-subtle font-mono tabular">{item.year}</p>
                <h3 className="text-headline text-ink-strong mt-2 mb-2">{item.title}</h3>
                <p className="text-[15.5px] text-ink-muted leading-relaxed max-w-2xl">{item.body}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-base py-24 md:py-36">
        <div className="container-comfy">
          <ScrollReveal>
            <p className="text-eyebrow text-ink-subtle mb-4">Değerlerimiz</p>
            <h2 className="text-display-lg font-editorial text-ink-strong max-w-[20ch] mb-12">
              Bizi diğer nakliyatçılardan ayıran dört şey.
            </h2>
          </ScrollReveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.title}>
                <article className="rounded-2xl bg-cream-raised border border-line p-7 h-full">
                  <p className="text-numeric-xl text-gold tabular text-[44px] mb-4 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-headline text-ink-strong mb-3">{v.title}</h3>
                  <p className="text-[14.5px] text-ink-muted leading-relaxed">{v.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact prompt */}
      <section className="bg-cream-sunken py-20 md:py-28">
        <div className="container-comfy grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <h2 className="text-display-md font-editorial text-ink-strong leading-tight max-w-[18ch]">
            Bir kahve eşliğinde tanışalım mı?
          </h2>
          <div className="text-[16px] text-ink-muted leading-relaxed">
            Ofisimize gelmek isteyenler için kapımız her zaman açık. Telefonla, WhatsApp ile veya
            e-posta üzerinden de bize ulaşabilirsiniz.
            <div className="mt-4 flex flex-wrap gap-2 text-ink">
              <Link href={`tel:${CONTACT.phoneTel}`} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] tabular hover:border-gold transition-colors">{CONTACT.phone}</Link>
              <Link href={`mailto:${CONTACT.email}`} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] hover:border-gold transition-colors">{CONTACT.email}</Link>
            </div>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
