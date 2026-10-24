import { z } from "zod";

export const HOME_TYPES = [
  { value: "studio", label: "Stüdyo" },
  { value: "1+1", label: "1+1" },
  { value: "2+1", label: "2+1" },
  { value: "3+1", label: "3+1" },
  { value: "4+1", label: "4+1 ve üzeri" },
  { value: "ofis", label: "Ofis" },
  { value: "diger", label: "Diğer" },
] as const;

export const DENSITIES = [
  { value: "az", label: "Az", helper: "Birkaç parça eşya" },
  { value: "orta", label: "Normal", helper: "Standart bir ev" },
  { value: "cok", label: "Çok", helper: "Hacimli, dolu bir ev" },
] as const;

export const EXTRAS = [
  { value: "paketleme", label: "Paketleme" },
  { value: "asansor", label: "Asansörlü servis" },
  { value: "depolama", label: "Depolama" },
  { value: "sigorta", label: "Ek değer sigortası" },
] as const;

export const teklifSchema = z.object({
  fromDistrict: z.string().min(1, "Çıkış ilçesi zorunlu"),
  toDistrict: z.string().min(1, "Varış ilçesi/şehri zorunlu"),
  homeType: z.enum(HOME_TYPES.map((h) => h.value) as [string, ...string[]]),
  density: z.enum(DENSITIES.map((d) => d.value) as [string, ...string[]]),
  extras: z.array(z.enum(EXTRAS.map((e) => e.value) as [string, ...string[]])).default([]),
  date: z.string().min(1, "Tarih seçmek zorunlu"),
  name: z.string().min(2, "Ad soyad zorunlu"),
  phone: z
    .string()
    .min(10, "Geçerli telefon numarası girin")
    .regex(/^[+\d\s()-]{10,}$/, "Sadece rakam ve telefon karakterleri"),
  email: z.string().email("Geçerli e-posta girin").optional().or(z.literal("")),
});

export type TeklifInput = z.infer<typeof teklifSchema>;
