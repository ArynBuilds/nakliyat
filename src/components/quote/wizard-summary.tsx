"use client";

import { HOME_TYPES, DENSITIES, EXTRAS } from "@/lib/teklif-schema";

type Form = {
  fromDistrict?: string;
  toDistrict?: string;
  homeType?: string;
  density?: string;
  extras?: string[];
  date?: string;
  name?: string;
  phone?: string;
  email?: string;
};

type Props = {
  form: Form;
  districtBySlug: Record<string, string>;
  onEdit: (stepIndex: number) => void;
};

export function WizardSummary({ form, districtBySlug, onEdit }: Props) {
  const homeLabel = HOME_TYPES.find((h) => h.value === form.homeType)?.label;
  const densityLabel = DENSITIES.find((d) => d.value === form.density)?.label;
  const extraLabels = (form.extras ?? [])
    .map((slug) => EXTRAS.find((e) => e.value === slug)?.label)
    .filter(Boolean) as string[];

  return (
    <div className="max-w-3xl">
      <p className="text-eyebrow text-ink-subtle mb-4">Son adım</p>
      <h2 className="text-display-lg font-editorial text-ink-strong leading-tight max-w-[18ch]">
        Tüm bilgileri aldık.
        <br />
        Onaylayın, ekibimiz dönsün.
      </h2>
      <p className="text-[15px] text-ink-muted mt-4">
        Teklif iletildikten sonra ekibimiz <span className="text-ink-strong font-medium">30 dakika içinde</span> sizi
        arar. Net bir fiyat aralığı için kısa bir keşif görüşmesi yeterlidir.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-line pt-10">
        <Row label="Çıkış" value={form.fromDistrict ? districtBySlug[form.fromDistrict] ?? form.fromDistrict : "—"} onEdit={() => onEdit(0)} />
        <Row label="Varış" value={form.toDistrict ? districtBySlug[form.toDistrict] ?? form.toDistrict : "—"} onEdit={() => onEdit(1)} />
        <Row label="Ev tipi" value={homeLabel ?? "—"} onEdit={() => onEdit(2)} />
        <Row label="Eşya yoğunluğu" value={densityLabel ?? "—"} onEdit={() => onEdit(3)} />
        <Row label="Ek hizmetler" value={extraLabels.length ? extraLabels.join(" · ") : "Yok"} onEdit={() => onEdit(4)} />
        <Row label="Tarih" value={formatDate(form.date)} onEdit={() => onEdit(5)} />
        <Row label="Adınız" value={form.name ?? "—"} onEdit={() => onEdit(6)} />
        <Row label="Telefon" value={form.phone ?? "—"} onEdit={() => onEdit(6)} tabular />
        {form.email && (
          <Row label="E-posta" value={form.email} onEdit={() => onEdit(6)} className="md:col-span-2" />
        )}
      </div>

      <div className="mt-12 rounded-2xl bg-cream-sunken border border-line p-6 md:p-8">
        <p className="text-eyebrow text-gold mb-3">Tahmini fiyat aralığı</p>
        <p className="text-display-md font-editorial text-ink-strong">Ekibimiz 30 dakika içinde size dönecek.</p>
        <p className="text-[14px] text-ink-muted mt-3 leading-relaxed">
          Her taşımanın fiyatı hacim, mesafe ve ek hizmete göre değişir. Net rakamı görmeden teklif vermek bizi rahatsız ediyor; bu yüzden önce sizi dinliyoruz.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  onEdit,
  tabular,
  className,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  tabular?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11.5px] uppercase tracking-[0.18em] text-ink-subtle">{label}</p>
        <button
          type="button"
          onClick={onEdit}
          className="text-[11.5px] uppercase tracking-[0.16em] text-ink-muted hover:text-gold-deep transition-colors"
        >
          Düzenle
        </button>
      </div>
      <p className={`text-[18px] md:text-[20px] font-editorial text-ink-strong ${tabular ? "tabular" : ""}`}>{value}</p>
    </div>
  );
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}
