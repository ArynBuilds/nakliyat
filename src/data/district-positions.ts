// Stylized positional layout. Not geographically exact — designed for legibility
// at viewport scale. x/y are percentages within the SVG viewBox.

export type DistrictPosition = {
  slug: string;
  x: number;
  y: number;
  size?: "sm" | "md" | "lg";
};

export const DISTRICT_POSITIONS: DistrictPosition[] = [
  // — Avrupa yakası —
  { slug: "catalca",       x: 4,  y: 32 },
  { slug: "silivri",       x: 10, y: 50, size: "sm" },
  { slug: "buyukcekmece",  x: 18, y: 56 },
  { slug: "beylikduzu",    x: 22, y: 64 },
  { slug: "esenyurt",      x: 26, y: 50 },
  { slug: "avcilar",       x: 28, y: 64 },
  { slug: "basaksehir",    x: 30, y: 38 },
  { slug: "arnavutkoy",    x: 22, y: 26 },
  { slug: "kucukcekmece",  x: 32, y: 56 },
  { slug: "bagcilar",      x: 36, y: 58 },
  { slug: "bahcelievler",  x: 38, y: 64, size: "sm" },
  { slug: "bakirkoy",      x: 36, y: 70 },
  { slug: "esenler",       x: 38, y: 50 },
  { slug: "gungoren",      x: 40, y: 60, size: "sm" },
  { slug: "zeytinburnu",   x: 42, y: 70, size: "sm" },
  { slug: "fatih",         x: 46, y: 70 },
  { slug: "bayrampasa",    x: 42, y: 56, size: "sm" },
  { slug: "gaziosmanpasa", x: 42, y: 48 },
  { slug: "sultangazi",    x: 38, y: 42 },
  { slug: "eyupsultan",    x: 40, y: 36 },
  { slug: "kagithane",     x: 46, y: 50 },
  { slug: "sisli",         x: 48, y: 56 },
  { slug: "besiktas",      x: 52, y: 60 },
  { slug: "sariyer",       x: 50, y: 30, size: "lg" },
  { slug: "beyoglu",       x: 50, y: 64 },

  // — Anadolu yakası —
  { slug: "uskudar",       x: 60, y: 60 },
  { slug: "kadikoy",       x: 62, y: 70 },
  { slug: "atasehir",      x: 68, y: 64 },
  { slug: "umraniye",      x: 66, y: 52 },
  { slug: "beykoz",        x: 60, y: 32, size: "lg" },
  { slug: "cekmekoy",      x: 72, y: 44 },
  { slug: "sancaktepe",    x: 72, y: 56 },
  { slug: "maltepe",       x: 72, y: 72 },
  { slug: "kartal",        x: 80, y: 72 },
  { slug: "pendik",        x: 86, y: 70 },
  { slug: "tuzla",         x: 92, y: 70, size: "sm" },
  { slug: "sultanbeyli",   x: 78, y: 60, size: "sm" },
  { slug: "sile",          x: 90, y: 28 },
  { slug: "adalar",        x: 70, y: 88, size: "sm" },
];
